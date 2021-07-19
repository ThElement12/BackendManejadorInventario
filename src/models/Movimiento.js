const { Schema, model } = require('mongoose');

const movimientoSchema = new Schema({
    codigoMovimiento: Number,
    codigoAlmacen: String,
    tipoMovimiento: String,
    codigoArticulo: String,
    cantidad: Number,
    fecha: Date
});

module.exports = model('movimiento_inventario', movimientoSchema);
