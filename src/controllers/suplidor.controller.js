const suplidorCtrl = {};

const articulo_suplidor = require('../models/Suplidor')

suplidorCtrl.getSuplidores = async (req, res) => {

    try {
        const suplidores = await articulo_suplidor.aggregate([
            {
                $project: {
                    _id: 0
                }
            }
        ]); 
        res.status(200).json(suplidores);
    } catch(err) {
        res.status(500).json(err);
    }
}

suplidorCtrl.createSuplidor = (req, res) => res.json({mensaje: "Suplidor salvado"});

suplidorCtrl.getSuplidor = async (req, res) => {
    const resultado = await articulo_suplidor.aggregate([
        {
            $match: {
                codigoSuplidor: req.params.id.toUpperCase()
            }
        },
        {
            $project:{
                _id: 0
            }
        }
    ])
    res.json(resultado);
}

suplidorCtrl.updateSuplidor = (req, res) => res.json({mensaje: "Suplidor actualizado"});

suplidorCtrl.deleteSuplidor = (req, res) => res.json({mensaje: "Suplidor borrado"});

module.exports = suplidorCtrl;