const ordenCtrl = {};

const orden_compra = require('../models/Orden')
ordenCtrl.getOrdenes = async (req, res) => {
    
    try {
        const ordenes = await orden_compra.aggregate([
            {
                $project:{
                    _id: 0
                }
            }
        ]); 
        res.status(200).json(ordenes);
    } catch(err) {
        res.status(500).json(err);
    }
}

ordenCtrl.createOrden = (req, res) => res.json({mensaje: "Orden salvada"});

ordenCtrl.getOrden = async (req, res) => {
    try {
        const orden = await orden_compra.aggregate([
            {
                $match: {
                    codigoOrdenCompra: req.params.id.toUpperCase()
                }
            },
            {
                $project:{
                    _id: 0
                }
            }
        ]); 
        res.status(200).json(orden);
    } catch(err) {
        res.status(500).json(err);
    }
}

ordenCtrl.updateOrden = (req, res) => res.json({mensaje: "Orden actualizada"});

ordenCtrl.deleteOrden = (req, res) => res.json({mensaje: "Orden borrada"});

module.exports = ordenCtrl;