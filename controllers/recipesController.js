const { pool } = require('../DB/dbConnection');

// Get all recipes
const getAllRecipes = (req, res) => {
  pool.query('SELECT * FROM recipes', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results.rows);
  });
};

// Get one recipe by ID
const getOneRecipe = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM recipes WHERE id = $1', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(results.rows[0]);
  });
};

// Create a new recipe
const createOneRecipe = (req, res) => {
  const { name, description } = req.body;
  pool.query(
    'INSERT INTO recipes (name, description) VALUES ($1, $2) RETURNING *',
    [name, description],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Update an existing recipe by ID
const updateOneRecipe = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  pool.query(
    'UPDATE recipes SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

// Delete a recipe by ID
const deleteOneRecipe = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  });
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
