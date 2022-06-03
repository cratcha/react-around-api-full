import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`modal modal_type_image ${card ? "modal_open" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="modal__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="modal__caption">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
