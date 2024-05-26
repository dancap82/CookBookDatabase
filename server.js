require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const recipesRoutes = require('./routes/recipesRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the recipes routes
app.use('/', recipesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
