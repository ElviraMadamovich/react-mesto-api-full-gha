const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизовался'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизовался'));
  }

  req.user = payload;

  return next();
};
