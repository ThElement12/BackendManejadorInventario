const movimientoCtrl = {};

const movimiento = require('../models/movimiento')

movimientoCtrl.getMovimientos = async (req, res) => {
        try {
        const movimientos = await movimiento.aggregate([
            {
                $project:{
                    _id: 0
                }
            }
        ]); 
        res.status(200).json(movimientos);
    } catch(err) {
        res.status(500).json(err);
    }
}
movimientoCtrl.createMovimiento = (req, res) => res.json({mensaje: "Movimiento salvado"});

movimientoCtrl.getMovimiento = async (req, res) => {
    
    try {
        const movimientos = await movimiento.aggregate([
            {
                $match: {
                    codigoMovimiento: req.params.id.toUpperCase()
                }
            },
            {
                $project:{
                    _id: 0
                }
            }
        ]); 
        res.status(200).json(movimientos);
    } catch(err) {
        res.status(500).json(err);
    }
}

movimientoCtrl.updateMovimiento = (req, res) => res.json({mensaje: "Movimiento actualizado"});

movimientoCtrl.deleteMovimiento = (req, res) => res.json({mensaje: "Movimiento borrado"});

module.exports = movimientoCtrl;