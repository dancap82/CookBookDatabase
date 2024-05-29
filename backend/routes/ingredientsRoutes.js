const express = require('express');
const router = express.Router();
const {
  getAllIngredients,
  getOneIngredient,
  createOneIngredient,
  updateOneIngredient,
  deleteOneIngredient
} = require('../controllers/ingredientsController');

router.get('/ingredients', getAllIngredients);
router.get('/ingredients/:id', getOneIngredient);
router.post('/ingredients', createOneIngredient);
router.put('/ingredients/:id', updateOneIngredient);
router.delete('/ingredients/:id', deleteOneIngredient);

module.exports = router;
