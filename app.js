const express = require('express');
const app = express();
require('dotenv').config();

const { getPgVersion } = require('./DB/dbConnection');

const { getAllRecipes, getOneRecipes, getAllIngredients, getOneIngredient } = require('./controllers/userControllers')

const PORT = process.env.BACK_END || 8000;

getPgVersion();

app.use(express.json());

app.route('/recipes').get(getAllRecipes);
app.route('/recipes/:id').get(getOneRecipes);
app.route('/ingredients').get(getAllIngredients);
app.route('/ingredients/:id').get(getOneIngredient);


app.listen(PORT, () => console.log(`Server running in ${PORT}`));