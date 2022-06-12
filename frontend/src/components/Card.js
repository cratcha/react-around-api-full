import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? 'element__trash' : 'element__trash_hidden'
  }`;

  const isLiked = card.likes.some((cardId) => cardId === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && 'element__like-button_activated'
  }`;

  return (
    <li className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        src={card.link}
        alt={card.name}
        className="element__photo"
        onClick={handleClick}
      />
      <div className="element__text-box">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__like-button__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
