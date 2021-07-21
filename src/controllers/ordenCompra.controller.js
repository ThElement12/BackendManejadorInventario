const ordenCtrl = {};
var mongoose = require('mongoose');


const orden_compra = require('../models/Orden');
const articulo = require('../models/Articulo');
const articulo_suplidor = require('../models/Suplidor')
const movimiento = mongoose.model('movimiento')

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

  var { fechaOrden, articulos, codigoOrdenCompra } = req.body;
  fecha = new Date(fechaOrden.slice(0, 10));
  try {
    ///Busca el producto que falta en el inventario
    var articulosNecesarios = await productosFaltantes(articulos, fecha);
    if (articulosNecesarios.length === 0) {
      res.status(200).json({ mensaje: "No necesita orden" });
    }

    var suplidores = []
    ///Busca el suplidor que pueda traerlo en la fecha necesaria
    for (i = 0; i < articulosNecesarios.length; i++) {
      aux = await suplidorCercano(articulosNecesarios[i].articulo, fecha)
      suplidores.push(aux);
    }
    var numeroOrden = parseInt(codigoOrdenCompra)

    
    var articuloSuplidor = []
    var ordenes = []
    for (i = 0; i < suplidores.length; i++) {
      var suplidor = null
      for (j = 0; j < articulosNecesarios.length; j++) {
        if (suplidor === null) {
          suplidor = suplidores[i].codigoSuplidor
        }
        if (suplidores[i].codigoArticulo === articulosNecesarios[j].articulo) {
          auxArticulo = {
            codigoArticulo: articulosNecesarios[j].articulo,
            cantidadOrdenada: articulosNecesarios[j].cantidad,
            precioCompra: articulosNecesarios[j].precio,
          }
          articuloSuplidor.push(auxArticulo);
        }
      }

      

        const newOrder = new orden_compra({
          codigoOrdenCompra: codigoOrdenCompra,
          codigoSuplidor: suplidor,
          fechaOrden: fecha,
          articulos: articuloSuplidor
        })
        console.log("hola")
        await newOrder.save();
        suplidor = suplidores[i].codigoSuplidor;
        numeroOrden++;
        articuloSuplidor = [];
      
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

const productosFaltantes = async function (articulos, fecha) {
  var articulosNecesarios = []
  ///Lo que hay en inventario
  const inventario = await articulo.aggregate([
    {
      $group: {
        _id: {
          CD: "$codigoArticulo",
          precio: "$precio"
        },
        total: {
          $sum: {
            $sum: "$almacen.balanceActual"
          }
        }
      }
    }, {
      $sort: {
        _id: 1
      }
    }
    ,
    {
      $project: {
        _id: 0,
        codigoArticulo: "$_id.CD",
        precio: "$_id.precio",
        cantidad: "$total"
      }
    }
  ]);
  ///Calculo del consumo diario
  var consumo = await movimiento.aggregate([
    {
      $match: {
        tipoMovimiento: "SALIDA",
      }
    },
    {
      $group: {
        _id: {
          CA: "$codigoArticulo",
          fecha: "$fecha"
        },
        movimientoDia: {
          $sum: "$cantidad"
        }
      }
    }, {
      $sort: {
        _id: 1
      }
    }
    ,
    {
      $project: {
        _id: 0,
        codigoArticulo: "$_id.CA",
        fecha: "$_id.fecha",
        movimientoDia: "$movimientoDia"
      }
    },
    {
      $group: {
        _id: "$codigoArticulo",
        consumoDiario: {
          $avg: "$movimientoDia"
        }
      }
    },
    {
      $project: {
        _id: 0,
        codigoArticulo: "$_id",
        consumoDiario: "$consumoDiario"
      }
    }
  ]);

  cantidadDias = Math.round((fecha.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  for (i = 0; i < articulos.length; i++) {
    var aux = articulos[i];
    for (j = 0; j < inventario.length; j++) {
      if (aux.codigoArticulo === inventario[j].codigoArticulo) {
        resto = inventario[j].cantidad - aux.cantidad - Math.round((cantidadDias * consumo[j].consumoDiario))
        if (resto < 0) {
          articulosNecesarios.push({
            articulo: aux.codigoArticulo,
            cantidad: resto * -1,
            precio: inventario[j].precio
          })
        }
        break;
      }
    }
  }
  return articulosNecesarios;
}
const suplidorCercano = async function (articulo, fecha) {
  const suplidores = await articulo_suplidor.aggregate([
    {
      $match: {
        codigoArticulo: articulo.toUpperCase()
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
  return selectedSupplier;

}
module.exports = ordenCtrl;