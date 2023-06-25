import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onConfirmation, isLoading }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirmation();
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDescription={isLoading ? 'Удаление...' : 'Да'}
    />
  );
}

export default ConfirmationPopup;