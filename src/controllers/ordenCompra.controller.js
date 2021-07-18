const ordenCtrl = {};


ordenCtrl.getOrdenes = (req, res) => res.json({mensaje: []});

ordenCtrl.createOrden = (req, res) => res.json({mensaje: "Orden salvada"});

ordenCtrl.getOrden = (req, res) => res.json({mensaje: []});

ordenCtrl.updateOrden = (req, res) => res.json({mensaje: "Orden actualizada"});

ordenCtrl.deleteOrden = (req, res) => res.json({mensaje: "Orden borrada"});

module.exports = ordenCtrl;