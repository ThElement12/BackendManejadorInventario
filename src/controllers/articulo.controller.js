const articuloCtrl = {};

const articulo = require('../models/Articulo');

articuloCtrl.getArticulos = async (req, res) => {

    try {
        const articulos = await articulo.find().lean().exec(); 
        
        res.status(200).json({data:articulos});
    } catch(err) {
        res.status(500).json(err);
    }
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