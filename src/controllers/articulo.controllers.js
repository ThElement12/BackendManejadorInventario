const articuloCtrl = {};


articuloCtrl.getArticulos = (req, res) => res.json({mensaje: []});

articuloCtrl.createArticulo = (req, res) => res.json({mensaje: "Articulo salvado"});

articuloCtrl.getArticulo = (req, res) => res.json({mensaje: []});

articuloCtrl.updateArticulo = (req, res) => res.json({mensaje: "Articulo actualizado"});

articuloCtrl.deleteArticulo = (req, res) => res.json({mensaje: "Articulo borrado"});

module.exports = articuloCtrl;