
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const recipesRoutes = require('./routes/recipesRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/', recipesRoutes);


app.use('/', ingredientsRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
