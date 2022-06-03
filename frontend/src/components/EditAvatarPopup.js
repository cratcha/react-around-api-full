import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Change Profile Picture"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input"
        name="link"
        placeholder="Image link"
        id="avatar"
        type="url"
        required
        ref={inputRef}
      />
      <span className="modal__error-text" id="avatar-error">
        Please enter a web address
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
