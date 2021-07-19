const { Schema, model} = require('mongoose');

const OrdenSchema = new Schema({
    codigoOrdenCompra: String,
    codigoSuplidor: Number,
    fechaOrden: Date,
    articulos: [{
        codigoArticulo: String,
        cantidadOrdenada: Number,
        unidadCompra: String,
        precioCompra: Number
    }]
});
module.exports = model('orden_compra', OrdenSchema);
