const User = require('../models/user');
const {
  HTTP_SUCCESS_OK,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../utils/error');

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(HTTP_SUCCESS_OK).send(users))
    .catch(() => res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send({ message: 'An error has occurred on the server' }));
};

const getUserbyId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'User ID not found' });
        return;
      }
      res.status(HTTP_SUCCESS_OK).send(user);
    })
    .catch(() => res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send({ message: 'An error has occurred on the server' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: 'Error' }));
};

const updateUserProfile = (req, res) => {
  const currentUser = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    currentUser,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: ' User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else if (err.name === 'CastError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: 'Invalid User ID passed for updation',
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};

const updateAvatar = (req, res) => {
  const currentUser = req.user._id;
  const { avatar } = req.body;

  User.findOneAndUpdate(
    currentUser,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(HTTP_CLIENT_ERROR_NOT_FOUND)
          .send({ message: 'User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else if (err.name === 'CastError') {
        res.status(HTTP_CLIENT_ERROR_BAD_REQUEST).send({
          message: 'Invalid avatar link passed for updation',
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({
          message: 'An error has occurred on the server',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserbyId,
  createUser,
  updateUserProfile,
  updateAvatar,
};
