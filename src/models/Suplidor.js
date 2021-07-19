const { Schema, model} = require('mongoose');

const articulo_suplidor = new Schema({
    codigoArticulo: String,
    codigoSuplidor: String,
    tiempoEntrega: Number,
    precioCompra: Number
    
});
module.exports = model('articulo_suplidor', articulo_suplidor,'articulo_suplidor');
