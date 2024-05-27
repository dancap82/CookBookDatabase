const express = require('express');
const router = express.Router();
const {
  getAllRecipes,
  getOneRecipe,
  createOneRecipe,
  updateOneRecipe,
  deleteOneRecipe
} = require('../controllers/recipesController');


router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getOneRecipe);
router.post('/recipes', createOneRecipe);
router.put('/recipes/:id', updateOneRecipe);
router.delete('/recipes/:id', deleteOneRecipe);

module.exports = router;
