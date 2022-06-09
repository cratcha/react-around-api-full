const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;
