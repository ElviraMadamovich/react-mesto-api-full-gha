import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

function EditAvatarPopup(props) {
  const { values, errors, isValid, handleUpdate, resetForm } = useValidation();

  const ref = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar(values);
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      resetForm={props.resetForm}
      buttonDescription={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isDisabled={!isValid}
    >

      <input
        ref={ref}
        type="url"
        className="popup__content popup__content_input_avatar"
        id="avatar"
        name="avatar"
        value={values.avatar || ""}
        onChange={handleUpdate}
        placeholder="Ссылка на картинку"
        required />

      <span
        className={`${errors.avatar ? "popup__error popup__error_active popup__error_avatar" : "popup__error"}`}
        id="avatar-error">
        {errors.avatar}
      </span>
    </PopupWithForm >
  )
}

export default EditAvatarPopup;
