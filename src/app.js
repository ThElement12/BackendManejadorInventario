const express = require('express');
const app = express();
const cors = require('cors');

//settings
app.set('port', 3000);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => res.send('Users Routes'));

module.exports = app;