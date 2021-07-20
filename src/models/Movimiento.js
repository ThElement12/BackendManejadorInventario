const { Schema, model } = require('mongoose');

const movimiento = new Schema({
    codigoMovimiento: String,
    codigoAlmacen: String,
    tipoMovimiento: String,
    codigoArticulo: String,
    cantidad: Number,
    fecha: Date
});

module.exports = model('movimiento', movimiento,'movimiento');
