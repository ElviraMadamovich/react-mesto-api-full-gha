const router = require('express').Router();
const {
  getUsers,
  getUserById,
  checkToken,
  updateDetails,
  changeUserAvatar,
} = require('../controllers/users');

const {
  validateGetUserById,
  validateChangeUser,
  validateChangeAvatar,
} = require('../middlewares/dataValidation');

router.get('/', getUsers);
router.get('/me', checkToken);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateChangeUser, updateDetails);
router.patch('/me/avatar', validateChangeAvatar, changeUserAvatar);

module.exports = router;
