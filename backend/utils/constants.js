const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const HTTP_STATUS_CREATED = 201;

const allowedCors = [
  'https://domainname.students.nomoreparties.sbs',
  'http://domainname.students.nomoreparties.sbs',
  'localhost:3000',
  'http://localhost:3000',
];

const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
  allowedCors,
  allowedMethods,
};
