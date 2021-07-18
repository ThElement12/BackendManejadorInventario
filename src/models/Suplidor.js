const { Schema, model} = require('mongoose');

const suplidorSchema = new Schema({
    codigoArticulo: String,
    codigoSuplidor: Int32Array,
    precioCompra: Float32Array,
    tiempoEntrega: Int32Array
});
module.exports = model('articulo_suplidor', suplidorSchema);
