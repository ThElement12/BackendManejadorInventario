const articuloCtrl = {};

const Articulo = require('../models/Articulo');

articuloCtrl.getArticulos = async (req, res) => {
    const articulos = await Articulo.aggregate([
        {
            $project:{
                _id: 0
            }
        }
    ])
    res.json(articulos);
}
articuloCtrl.createArticulo = (req, res) =>{

     res.json({mensaje: "Articulo salvado"})
    };

articuloCtrl.getArticulo = async (req, res) => {
    const articulo = await Articulo.aggregate([
        {
            $match: {
                codigoArticulo: req.params.id
            }
        }
    ])
    res.json(articulo);
}

articuloCtrl.updateArticulo = (req, res) => res.json({mensaje: "Articulo actualizado"});

articuloCtrl.deleteArticulo = (req, res) => res.json({mensaje: "Articulo borrado"});

module.exports = articuloCtrl;