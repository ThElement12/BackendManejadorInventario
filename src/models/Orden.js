const { Schema, model} = require('mongoose');

const OrdenSchema = new Schema({
    codigoOrdenCompra: String,
    codigoSuplidor: Int32Array,
    fechaOrden: Date,
    articulos: [{
        codigoArticulo: String,
        cantidadOrdenada: Int32Array,
        unidadCompra: String,
        precioCompra: Float32Array
    }]
});
module.exports = model('orden_compra', OrdenSchema);
