const movimientoCtrl = {};

const movimiento = require('../models/movimiento')

movimientoCtrl.getMovimientos = async (req, res) => {
    
    //console.log(movimientos)
    try {
        const movimientos = await movimiento.find().lean().exec(); 
        
        res.status(200).json({data:movimientos});
    } catch(err) {
        res.status(500).json(err);
    }
}



movimientoCtrl.createMovimiento = (req, res) => res.json({mensaje: "Movimiento salvado"});

movimientoCtrl.getMovimiento = (req, res) => res.json({mensaje: []});

movimientoCtrl.updateMovimiento = (req, res) => res.json({mensaje: "Movimiento actualizado"});

movimientoCtrl.deleteMovimiento = (req, res) => res.json({mensaje: "Movimiento borrado"});

module.exports = movimientoCtrl;