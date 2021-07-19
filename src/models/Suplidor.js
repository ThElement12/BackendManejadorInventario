const { Schema, model} = require('mongoose');

const articulo_suplidor = new Schema({
    codigoArticulo: String,
    codigoSuplidor: { 
        type: String, 
        unique:true 
    },
    tiempoEntrega: Number,
    precioCompra: Number
    
});
module.exports = model('articulo_suplidor', articulo_suplidor,'articulo_suplidor');
