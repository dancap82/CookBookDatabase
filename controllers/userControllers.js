const { pool } = require('../DB/dbConnection');

const getAllRecipes = (req, res) => {
    console.log('Received request to get all users');
    pool.query('SELECT * FROM cookbook', (error, results) => {
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
    pool.query('SELECT * FROM cookbook WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results) {
        res.status(200).json(results.rows);
      }
    });
  };



module.exports = { getAllRecipes, getOneRecipes }