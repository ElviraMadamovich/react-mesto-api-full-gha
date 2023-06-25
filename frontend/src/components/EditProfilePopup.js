import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useValidation } from "../hooks/useValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleUpdate, setValues, resetForm } = useValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues({
        name: currentUser.name,
        about: currentUser.about
      });
    }
  }, [isOpen, resetForm, currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values)
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      resetForm={resetForm}
      isDisabled={!isValid}
      buttonDescription={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        value={values.name || ''}
        onChange={handleUpdate}
        type="text"
        id="name"
        name="name"
        className="popup__content popup__content_input_name"
        placeholder="Имя пользователя"
        required
        minLength={2}
        maxLength={40} />

      <span
        className={`${errors.name ? "popup__error popup__error_active popup__error_name" : "popup__error"}`}
        id="name-error">
        {errors.name}
      </span>

      <input
        value={values.about || ''}
        onChange={handleUpdate}
        type="text"
        className="popup__content popup__content_input_work"
        id="work"
        name="about"
        placeholder="О пользователе"
        required
        minLength={2}
        maxLength={200} />

      <span
        className={`${errors.about ? "popup__error popup__error_active popup__error_work" : "popup__error"}`}
        id="work-error">
        {errors.about}
      </span>

    </PopupWithForm>
  )
}

export default EditProfilePopup;
