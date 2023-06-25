import React from 'react';
import success from '../images/success.svg';
import failed from '../images/fail.svg';
import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, message }) {

  usePopupClose(isOpen, onClose)

  function handleCloseButton(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    };
    if (evt.target.classList.contains('popup__close')) {
      onClose();
    };
  }

  return (
    <div className={`popup popup__login-status ${isOpen ? "popup_opened" : ""}`} onMouseDown={handleCloseButton}>
      <div className="popup__container popup__infoTooltip">
        <img src={message.status ? success : failed} className="popup__login-image" alt="успешно"></img>
        <h2 className="popup__status popup__status_type_infoTooltip">
          {message.text}
        </h2>
        <button
          className="popup__close"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;