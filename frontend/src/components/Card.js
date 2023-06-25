import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onLikeButtonClick, onDeleteButtonClick }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((person) => person._id === currentUser._id);
  const likeButton = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );
  const deleteButton = (
    `elements__delete_inactive ${isOwner && 'elements__delete'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLike() {
    onLikeButtonClick(card);
  }

  function handleDelete() {
    onDeleteButtonClick(card);
  }

  return (
    <li className="elements__pic">
      {isOwner && (<button type="button" onClick={handleDelete} className={deleteButton}></button>)}
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="elements__title">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__likes">
          <button type="button" onClick={handleLike} className={likeButton}></button>
          <p className="elements__likes-qty">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
