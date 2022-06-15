const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserbyId,
  updateUserProfile,
  updateAvatar,
} = require('../controllers/users');
//const { validateRequestAuth } = require('../middleware/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserbyId);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
