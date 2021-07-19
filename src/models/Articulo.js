const { Schema, model} = require('mongoose');

const articuloSchema = new Schema({
    codigoArticulo: String,
    descripcion: String,
    codigoAlmacen: String,
    balanceActual: Number,
    unidadDeCompra: String,
    precio: Number

});
module.exports = model('articulo_suplidor', articuloSchema);
