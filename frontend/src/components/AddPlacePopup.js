import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      title="New Place"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input"
        name="name"
        placeholder="name"
        id="title"
        type="text"
        required
        minLength="1"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="modal__error-text" id="title-error">
        Please fill out this field.
      </span>
      <input
        className="modal__input"
        name="link"
        placeholder="Image link"
        id="link"
        type="url"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="modal__error-text" id="link-error">
        Please enter a web address
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
