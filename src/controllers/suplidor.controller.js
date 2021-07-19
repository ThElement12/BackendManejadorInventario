const suplidorCtrl = {};

const articulo_suplidor = require('../models/Suplidor')

suplidorCtrl.getSuplidores = async (req, res) => {

    try {
        const suplidores = await articulo_suplidor.find().lean().exec(); 
        
        res.status(200).json({data:suplidores});
    } catch(err) {
        res.status(500).json(err);
    }
}

suplidorCtrl.createSuplidor = (req, res) => res.json({mensaje: "Suplidor salvado"});

suplidorCtrl.getSuplidor = (req, res) => res.json({mensaje: []});

suplidorCtrl.updateSuplidor = (req, res) => res.json({mensaje: "Suplidor actualizado"});

suplidorCtrl.deleteSuplidor = (req, res) => res.json({mensaje: "Suplidor borrado"});

module.exports = suplidorCtrl;