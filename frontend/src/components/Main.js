import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "./Card";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar" onClick={onEditAvatarClick}>
            <img
              src={currentUser.avatar}
              alt="Profile photo"
              className="profile__avatar-image"
            />
            <button className="profile__avatar-button" type="button" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__occupation">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfileClick}
            />
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        />
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
