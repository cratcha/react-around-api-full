const router = require('express').Router();

const {
  getUsers,
  getUserbyId,
  updateUserProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserbyId);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
