const { Schema, model} = require('mongoose');

const articulo = new Schema({
    codigoArticulo: String,
    descripcion: String,
    codigoAlmacen: String,
    balanceActual: Number,
    unidadDeCompra: String,
    precio: Number

});
module.exports = model('articulo', articulo,'articulo');
