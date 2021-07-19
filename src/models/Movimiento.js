const { Schema, model } = require('mongoose');

const movimiento = new Schema({
    codigoMovimiento: { 
        type: String, 
        unique:true 
    },
    codigoAlmacen: String,
    tipoMovimiento: String,
    codigoArticulo: String,
    cantidad: Number,
    fecha: Date
});

module.exports = model('movimiento', movimiento,'movimiento');
