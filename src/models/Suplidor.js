const { Schema, model} = require('mongoose');

const suplidorSchema = new Schema({
    codigoArticulo: String,
    codigoSuplidor: Number,
    precioCompra: Number,
    tiempoEntrega: Number
});
module.exports = model('articulo_suplidor', suplidorSchema);
