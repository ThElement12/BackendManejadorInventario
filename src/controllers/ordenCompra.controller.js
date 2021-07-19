const ordenCtrl = {};

const orden_compra = require('../models/Orden')
ordenCtrl.getOrdenes = async (req, res) => {
    
    //console.log(movimientos)
    try {
        const ordenes = await orden_compra.find().lean().exec(); 
        
        res.status(200).json({data:ordenes});
    } catch(err) {
        res.status(500).json(err);
    }
}

ordenCtrl.createOrden = (req, res) => res.json({mensaje: "Orden salvada"});

ordenCtrl.getOrden = (req, res) => res.json({mensaje: []});

ordenCtrl.updateOrden = (req, res) => res.json({mensaje: "Orden actualizada"});

ordenCtrl.deleteOrden = (req, res) => res.json({mensaje: "Orden borrada"});

module.exports = ordenCtrl;