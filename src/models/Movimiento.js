const { Schema, model } = require('mongoose');

const movimientoSchema = new Schema({
    codigoMovimiento: Int32Array,
    codigoAlmacen: String,
    tipoMovimiento: String,
    codigoArticulo: String,
    cantidad: Int32Array,
    fecha: Date
});

module.exports = model('movimiento_inventario', movimientoSchema);
