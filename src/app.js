const express = require('express');
const app = express();
const cors = require('cors');

//settings
app.set('port', 3000);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/articulo', require('./routes/articulo'));
app.use('/movimiento', require('./routes/movimiento'));
app.use('/orden', require('./routes/ordenCompra'));
app.use('/suplidor', require('./routes/suplidor'));

app.get('/test', (req, res) => {
    
    res.send('Users Routes')
});
module.exports = app;