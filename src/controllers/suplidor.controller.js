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
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
}
suplidorCtrl.getSuplidorCercanoPorProducto = async (req, res) => {
  try {
    var { codigoProducto, fecha } = req.body
    fecha = new Date(fecha.slice(0,10));
    const suplidores = await articulo_suplidor.aggregate([
      {
        $match: {
          codigoArticulo: codigoProducto.toUpperCase()
        }
      },
      {
        $sort: {
          codigoArticulo: 1,
          tiempoEntrega: 1

        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ])

    var selectedSupplier = null;
    var date;
    for (i = 0; i < suplidores.length; i++) {
      if (selectedSupplier === null) {
        date = new Date()
        date.setDate(date.getDate() + suplidores[i].tiempoEntrega);
        if (date <= fecha) {
          selectedSupplier = suplidores[i]
          selectedSupplier.fechaEntrega = date;
        }
      } else {
        date = new Date()
        date.setDate(date.getDate() + suplidores[i].tiempoEntrega);

        if (selectedSupplier.fechaEntrega <= date && date <= fecha) {
          selectedSupplier = suplidores[i]
          selectedSupplier.fechaEntrega = date;
        }
      }
    }
    if (selectedSupplier == null) {
      date = new Date()
      date.setDate(date.getDate() + suplidores[0].tiempoEntrega);
      selectedSupplier = suplidores[0]
      selectedSupplier.fechaEntrega = date;
    }
    res.status(200).json(selectedSupplier);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
}

suplidorCtrl.createSuplidor = (req, res) => res.json({ mensaje: "Suplidor salvado" });

suplidorCtrl.getSuplidor = async (req, res) => {
  const resultado = await articulo_suplidor.aggregate([
    {
      $match: {
        codigoSuplidor: req.params.id.toUpperCase()
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ])
  res.json(resultado);
}

suplidorCtrl.updateSuplidor = (req, res) => res.json({ mensaje: "Suplidor actualizado" });

suplidorCtrl.deleteSuplidor = (req, res) => res.json({ mensaje: "Suplidor borrado" });

module.exports = suplidorCtrl;