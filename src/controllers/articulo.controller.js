const articuloCtrl = {};

const articulo = require('../models/Articulo');

articuloCtrl.getArticulos = async (req, res) => {

    try {
        const articulos = await articulo.aggregate([
            {
                $project: {
                    _id: 0
                }
            }
        ]); 
        
        res.status(200).json(articulos);
    } catch(err) {
        res.status(500).json(err);
    }
}
articuloCtrl.createArticulo = async (req, res) => {
    try {
    const {codigoArticulo,descripcion,codigoAlmacen,balanceActual,unidadDeCompra,precio} = req.body

    const newArticulo = new articulo({
        codigoArticulo:codigoArticulo,
        descripcion:descripcion,
        codigoAlmacen:codigoAlmacen,
        balanceActual:balanceActual,
        unidadDeCompra:unidadDeCompra,
        precio:precio

    })
    
    await newArticulo.save();
    res.status(200).json({message:"Articulo guardado con exito"});
} catch(err) {
    res.status(500).json(err);
}
}

articuloCtrl.getArticulo = async (req, res) => {
    const resultado = await articulo.aggregate([
        {
            $match: {
                codigoArticulo: req.params.id.toUpperCase()
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

articuloCtrl.updateArticulo = (req, res) => res.json({mensaje: "Articulo actualizado"});

articuloCtrl.deleteArticulo = (req, res) => res.json({mensaje: "Articulo borrado"});

module.exports = articuloCtrl;