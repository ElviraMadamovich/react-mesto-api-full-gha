import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, errors, isValid, handleUpdate, resetForm } = useValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name="card"
      buttonDescription={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}>

      <input
        value={values.name || ""}
        onChange={handleUpdate}
        type="text"
        className="popup__content popup__content_input_title"
        id="caption"
        name="name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30} />

      <span
        className={`${errors.caption ? "popup__error popup__error_active popup__error_title" : "popup__error"}`}
        id="caption-error">
        {errors.caption}
      </span>

      <input
        value={values.link || ""}
        onChange={handleUpdate}
        type="url"
        className="popup__content popup__content_input_link"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required />

      <span
        className={`${errors.link ? "popup__error popup__error_active popup__error_link" : "popup__error"}`}
        id="link-error">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
