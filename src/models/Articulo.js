const { Schema, model} = require('mongoose');

const articulo = new Schema({
    codigoArticulo: String,
    descripcion: String,
    almacen:[{
        codigoAlmacen: String,
        balanceActual: Number
    }],
    precio: Number

});
module.exports = model('articulo', articulo,'articulo');
