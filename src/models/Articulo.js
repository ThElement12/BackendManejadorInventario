const { Schema, model} = require('mongoose');

const articulo = new Schema({
    codigoArticulo: { 
        type: String, 
        unique:true 
    },
    descripcion: String,
    codigoAlmacen: String,
    balanceActual: Number,
    unidadDeCompra: String,
    precio: Number

});
module.exports = model('articulo', articulo,'articulo');
