const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./controllers');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

mongoose.connect('mongodb://127.0.0.1:27017/bion');
app.use('/api/products',productRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });