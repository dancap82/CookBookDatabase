const express = require('express');
const app = express();
require('dotenv').config();

const { getPgVersion } = require('./DB/dbConnection');

const { getAllRecipes, getOneRecipes } = require('./controllers/userControllers')

const PORT = process.env.BACK_END || 8000;

getPgVersion();

app.use(express.json());

app.route('/recipes').get(getAllRecipes);
app.route('/recipes/:id').get(getOneRecipes);


app.listen(PORT, () => console.log(`Server running in ${PORT}`));