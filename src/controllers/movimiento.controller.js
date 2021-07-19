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
movimientoCtrl.createMovimiento =  async (req, res) => {
    try {
    const {codigoMovimiento,codigoAlmacen,tipoMovimiento,codigoArticulo,cantidad,fecha} = req.body

    const newMovimiento = new movimiento({
        codigoMovimiento:codigoMovimiento,
        codigoAlmacen:codigoAlmacen,
        tipoMovimiento:tipoMovimiento,
        codigoArticulo:codigoArticulo,
        cantidad:cantidad,
        fecha:fecha
    })
    
    await newMovimiento.save();
    console.log("data")
    res.status(200).json({message:"Movimiento guardado con exito"});
} catch(err) {
    res.status(500).json(err);
}
}

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