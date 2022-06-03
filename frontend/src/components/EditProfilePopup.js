import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit Profile"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input"
        name="name"
        placeholder="Name"
        id="name"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="modal__error-text" id="name-error">
        Please fill out this field.
      </span>
      <input
        className="modal__input"
        name="about"
        placeholder="About me"
        id="description"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="modal__error-text" id="description-error">
        Please fill out this field.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
