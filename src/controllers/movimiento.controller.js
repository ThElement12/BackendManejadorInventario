const movimientoCtrl = {};


movimientoCtrl.getMovimientos = (req, res) => res.json({mensaje: []});

movimientoCtrl.createMovimiento = (req, res) => res.json({mensaje: "Movimiento salvado"});

movimientoCtrl.getMovimiento = (req, res) => res.json({mensaje: []});

movimientoCtrl.updateMovimiento = (req, res) => res.json({mensaje: "Movimiento actualizado"});

movimientoCtrl.deleteMovimiento = (req, res) => res.json({mensaje: "Movimiento borrado"});

module.exports = movimientoCtrl;