import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  title,
  name,
  children,
  buttonDescription,
  isOpen,
  onClose,
  onSubmit,
  isDisabled
}) {

  usePopupClose(isOpen, onClose)

  return (
    <section className={`popup ${name}-popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h2 className="popup__order">{title}</h2>
        <form name={`${name}`} method="post" target="_parent" action="#" encType="application/x-www-form-urlencoded" onSubmit={onSubmit} className={`popup__form ${name}-popup__form`} noValidate>
          {children}
          <button type="submit" disabled={isDisabled} className={`popup__confirm ${isDisabled && "popup__confirm_disabled"}`}>{buttonDescription}</button>
        </form>
      </div>
    </section >
  );
}

export default PopupWithForm;
