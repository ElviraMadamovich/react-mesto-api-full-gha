import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import userAvatar from "../images/Cousteau.jpg";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onLikeButtonClick,
  onDeleteButtonClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__button-avatar" name="avatar-button" aria-label="avatar-button" type="button"></button>
        <img className="profile__image" src={currentUser.avatar ?? userAvatar} alt="Аватар" />
        <div className="profile__author">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name ?? "Имя пользователя"}</h1>
            <button onClick={onEditProfile} type="button" className="profile__edit" name="edit-button" aria-label="edit-button"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about ?? "О пользователе"}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button" name="card-button" aria-label="card-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__pics">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onLikeButtonClick={onLikeButtonClick}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;