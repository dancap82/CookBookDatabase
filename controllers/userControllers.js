const { pool } = require('../DB/dbConnection');

const getAllRecipes = (req, res) => {
    console.log('Received request to get all users');
    pool.query('SELECT * FROM recipes', (error, results) => {
      if (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ error: error.message });
      }
      console.log('Query successful, returning results');
      res.status(200).json(results.rows);
    });
  };



const getOneRecipes = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM recipes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results) {
        res.status(200).json(results.rows);
      }
    });
  };

  const getAllIngredients = (req, res) => {
    console.log('Received request to get all users');
    pool.query('SELECT * FROM ingredients', (error, results) => {
      if (error) {
        console.error('Error executing query', error.stack);
        return res.status(500).json({ error: error.message });
      }
      console.log('Query successful, returning results');
      res.status(200).json(results.rows);
    });
  };


  const getOneIngredient = (req, res) => {
    const { ingredient_id } = req.params;
    pool.query('SELECT * FROM ingredients WHERE ingredient_id = $1', [ingredient_id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results) {
        res.status(200).json(results.rows);
      }
    });
  };




module.exports = { getAllRecipes, getOneRecipes, getAllIngredients, getOneIngredient }