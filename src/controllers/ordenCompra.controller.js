const ordenCtrl = {};

const orden_compra = require('../models/Orden')
const articulo = require('../models/Articulo');

ordenCtrl.getOrdenes = async (req, res) => {

  try {
    const ordenes = await orden_compra.aggregate([
      {
        $project: {
          _id: 0
        }
      }
    ]);
    res.status(200).json(ordenes);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
}


ordenCtrl.createOrden = async (req, res) => {
  /**
   * fecha: DATE
   * articulos: [
   *  {codigoProducto, cantidad}
   * ]
   */
  const { fecha, articulos } = req.body;
  try {
    ///Busca el producto que falta en el inventario
    var articulosNecesarios = productosFaltantes(articulos);
    if(articulosNecesarios.length === 0){
      res.status(200).json({ mensaje: "No necesita orden" });
    }
    
    ///Busca el suplidor que pueda traerlo en la fecha necesaria
    fecha = new Date(fecha.slice(0, 10));
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
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }

}

ordenCtrl.getOrden = async (req, res) => {
  try {
    const orden = await orden_compra.aggregate([
      {
        $match: {
          codigoOrdenCompra: req.params.id.toUpperCase()
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);
    res.status(200).json(orden);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
}

ordenCtrl.updateOrden = (req, res) => res.json({ mensaje: "Orden actualizada" });

ordenCtrl.deleteOrden = (req, res) => res.json({ mensaje: "Orden borrada" });

const productosFaltantes = function(articulos){
  var articulosNecesarios = []
  const inventario = await articulo.aggregate([
    {
      $group: {
        _id: "$codigoArticulo",
        total: {
          $sum: {
            $sum: "$almacen.balanceActual"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        codigoArticulo: "$_id",
        cantidad: "$total"
      }
    }
  ]);

  for (i = 0; i < articulos.length; i++) {
    var aux = articulos[i];
    for (j = 0; j < inventario.length; j++) {
      if (aux.codigoProducto === inventario[i].codigoArticulo) {
        resto = inventario[i].cantidad - aux.cantidad
        if (resto < 0) {
          articulosNecesarios.push({
            articulo: aux.codigoProducto,
            cantidad: resto * -1
          })
        }
        break;
      }
    }
  }
  return articulosNecesarios;
}

module.exports = ordenCtrl;