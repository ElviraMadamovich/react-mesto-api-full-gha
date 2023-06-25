import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { authorize, register, checkToken } from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardToBeDeleted, setCardToBeDeleted] = React.useState(null);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState({
    status: false,
    text: "",
  });
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleLogin(values, setLoadingImage) {

    const { emailInput, password } = values
    authorize(emailInput, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        navigate('/', { replace: true })
        setUserEmail(emailInput)
      })
      .catch((res) => {
        if (res === 'Ошибка: 401') {
          setMessage({
            status: false,
            text: "Аккаунт не зарегистрирован",
          });
        } else {
          setMessage({
            status: false,
            text: res,
          });
        }
        setOpenInfoTooltip(true);
      })
      .finally(() => {
        setLoadingImage(false)
      })
  }

  function handleRegister(values, setLoadingImage) {
    const { emailInput, password } = values
    register(emailInput, password)
      .then(() => {
        setMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate('/sign-in', { replace: true })
      })
      .catch(() => {
        setMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setLoadingImage(false)
        setOpenInfoTooltip(true)
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ])
        .then(([user, card]) => {
          setCurrentUser(user)
          setCards(card);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDelete(card) {
    setCardToBeDeleted(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToBeDeleted(null);
    setOpenInfoTooltip(false)
    setIsLoading(false);
  }

  function handleAmendUser(userInfo) {
    setIsLoading(true);
    api
      .updateDetails(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => { setIsLoading(false) });
  }

  function handleAmendAvatar({ avatar }) {
    setIsLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => { setIsLoading(false) });
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => { setIsLoading(false) });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLike(card) {
    const isLiked = card.likes.some((person) => person._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleConfirmCardDelete() {
    setIsLoading(true);
    const cardId = cardToBeDeleted._id;
    api
      .deleteUserCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => { setIsLoading(false) });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Header userEmail={userEmail} signOut={signOut} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} setMessage={setMessage} setOpenInfoTooltip={setOpenInfoTooltip} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onLikeButtonClick={handleLike}
              onDeleteButtonClick={handleDelete}
            />
          } />
        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAmendAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleAmendUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={!!cardToBeDeleted}
          onClose={closeAllPopups}
          onConfirmation={handleConfirmCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
          
        <InfoTooltip isOpen={isOpenInfoTooltip} onClose={closeAllPopups} message={message} />
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
