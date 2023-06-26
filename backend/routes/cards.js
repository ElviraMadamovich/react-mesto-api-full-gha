const router = require('express').Router();
const {
  getInitialCards,
  addNewCard,
  deleteUserCard,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/dataValidation');

router.get('/', getInitialCards);
router.post('/', validateCreateCard, addNewCard);
router.delete('/:cardId', validateCardId, deleteUserCard);
router.put('/:cardId/likes', validateCardId, putLike);
router.delete('/:cardId/likes', validateCardId, removeLike);

module.exports = router;
