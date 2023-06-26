const routes = require('express').Router();
const { errors } = require('celebrate');

const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const {
  authorize,
  register,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/dataValidation');
const NotFoundError = require('../utils/errors/NotFoundError');

routes.post('/signin', validateLogin, authorize);
routes.post('/signup', validateCreateUser, register);

routes.use('/users', auth, users);
routes.use('/cards', auth, cards);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

routes.use(errors());

module.exports = routes;
