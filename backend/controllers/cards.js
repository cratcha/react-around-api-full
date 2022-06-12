const Card = require('../models/card');
const {
  HTTP_SUCCESS_OK,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../utils/error');

// GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(HTTP_SUCCESS_OK).send(cards))
    .catch(() => {
      res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send({ messaage: 'An error has occured on the server' });
    });
};

// POST
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: 'An error has occured on the server' });
      }
    });
};

// DELETE
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById({ _id: cardId })
    .orFail(() => new Error('Card ID not found'))
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        throw new Error("Don't have permission to delete");
      }
      Card.findByIdAndRemove({ _id: cardId })
        .orFail()
        .then((card) => res.status(HTTP_SUCCESS_OK).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: 'Invalid Card ID',
        });
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: currentUser } },
    { new: true }
  )
    .orFail(new Error('Card not found'))
    .then((card) => res.status(HTTP_SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: ' Card not found' });
      } else if (err.name === 'CastError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: 'Invalid Card ID passed for liking a card',
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({
          message: ' An error has occurred on the server',
        });
      }
    });
};

const dislikeCard = (req, res) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: currentUser } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(HTTP_SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'Card not found' });
      } else if (err.name === 'CastError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: 'Invalid Card ID passed for disliking a card',
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
