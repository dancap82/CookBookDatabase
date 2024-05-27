
const { pool } = require('../DB/dbConnection');

const getAllIngredients = (req, res) => {
  pool.query('SELECT * FROM ingredients', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results.rows);
  });
};

const getOneIngredient = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM ingredients WHERE ingredient_id = $1', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json(results.rows[0]);
  });
};

const createOneIngredient = (req, res) => {
  const { ingredient_name, ingredient_amount, recipe_id } = req.body;
  pool.query(
    'INSERT INTO ingredients (ingredient_name, ingredient_amount, recipe_id) VALUES ($1, $2, $3) RETURNING *',
    [ingredient_name, ingredient_amount, recipe_id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

const updateOneIngredient = (req, res) => {
  const { id } = req.params;
  const { ingredient_name, ingredient_amount, recipe_id } = req.body;
  pool.query(
    'UPDATE ingredients SET ingredient_name = $1, ingredient_amount = $2, recipe_id = $3 WHERE ingredient_id = $4 RETURNING *',
    [ingredient_name, ingredient_amount, recipe_id, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ message: 'Ingredient not found' });
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const deleteOneIngredient = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM ingredients WHERE ingredient_id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json({ message: 'Ingredient deleted successfully' });
  });
};

module.exports = {
  getAllIngredients,
  getOneIngredient,
  createOneIngredient,
  updateOneIngredient,
  deleteOneIngredient,
};
