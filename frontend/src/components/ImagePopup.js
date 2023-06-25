import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {

  usePopupClose(card?.link, onClose)

  return (
    <section className={`popup image-popup` + (card !== null && " popup_opened")}>
      <div className="image-popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="image-popup__pic" src={card?.link} alt={card?.name} />
        <h2 className="image-popup__name">{card !== null ? card.name : "#"}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
