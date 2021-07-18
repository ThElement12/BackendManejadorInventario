const { Schema, model} = require('mongoose');

const articuloSchema = new Schema({
    codigoArticulo: String,
    descripcion: String,
    codigoAlmacen: String,
    balanceActual: Int32Array,
    unidadDeCompra: String,
    precio: Float32Array

});
module.exports = model('articulo_suplidor', articuloSchema);
