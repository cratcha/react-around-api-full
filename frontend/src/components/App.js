import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setisInfoToolTipOpen] = React.useState(false);
  const [toolTipStatus, setToolTipStatus] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && isLoggedIn) {
      api
        .getAppInfo(token)
        .then(([CardData, userData]) => {
          setCurrentUser(userData);
          setCards(CardData);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setIsLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setisInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((cardId) => cardId === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(
          'Uh-oh! Error occurred while changing the like status of the card.'
        );
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        if (res.data._id) {
          setToolTipStatus('success');
          setisInfoToolTipOpen(true);
          const userData = {
            email,
            password,
          };
          onLogin(userData);
        } else {
          setToolTipStatus('fail');
          setisInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setToolTipStatus('fail');
        setisInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setEmail(email);
          history.push('/');
        } else {
          setToolTipStatus('fail');
          setisInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setToolTipStatus('fail');
        setisInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title="Are you sure?"
          name="remove-card"
          buttonText="Yes"
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={toolTipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
