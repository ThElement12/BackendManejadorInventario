const suplidorCtrl = {};


suplidorCtrl.getSuplidores = (req, res) => res.json({mensaje: []});

suplidorCtrl.createSuplidor = (req, res) => res.json({mensaje: "Suplidor salvado"});

suplidorCtrl.getSuplidor = (req, res) => res.json({mensaje: []});

suplidorCtrl.updateSuplidor = (req, res) => res.json({mensaje: "Suplidor actualizado"});

suplidorCtrl.deleteSuplidor = (req, res) => res.json({mensaje: "Suplidor borrado"});

module.exports = suplidorCtrl;