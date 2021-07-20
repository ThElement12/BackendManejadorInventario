const ordenCtrl = {};
var mongoose = require('mongoose');


const orden_compra = require('../models/Orden');
const articulo = require('../models/Articulo');
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
  var { fecha, articulos, codigoOrden } = req.body;
  fecha = new Date(fecha.slice(0, 10));
  try {
    ///Busca el producto que falta en el inventario
    var articulosNecesarios = productosFaltantes(articulos, fecha);
    if (articulosNecesarios.length === 0) {
      res.status(200).json({ mensaje: "No necesita orden" });
    }

    var suplidores = []
    ///Busca el suplidor que pueda traerlo en la fecha necesaria
    for(i = 0; i < articulosNecesarios.length; i++){
      aux = suplidorCercano(articulosNecesarios[i].articulo, fecha)
      suplidores.push(aux);
    }
    var numeroOrden = parseInt(codigoOrden)

    var suplidor = null
    var articuloSuplidor = []
    for(i = 0; i < suplidores.length; i++){
      if(suplidor === null){
        suplidor = suplidores[i].codigoSuplidor
      }
      else if(suplidor !== suplidores[i].codigoSuplidor){
        const newOrder = new orden_compra({
          codigoOrdenCompra: codigoOrden,
          codigoSuplidor: suplidor,
          fechaOrden: fecha,
          articulos: articuloSuplidor
        })
        await newOrder.save();
        suplidor = suplidores[i].codigoSuplidor;
        numeroOrden++;
        articuloSuplidor = [];
      }
      for(j = 0; j < articulosNecesarios.legnth; i++){
        if(suplidores[i].codigoArticulo === articulosNecesarios[i].codigoArticulo){
          auxArticulo = {
            codigoArticulo: articulosNecesarios[i].codigoArticulo,
            cantidadOrdenada: articulosNecesarios[i].cantidad,
            precioCompra: articulosNecesarios[i].precio,
          }
          articuloSuplidor.push(auxArticulo);
        }
      }
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
    },
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
    },
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

  cantidadDias = Math.round((fecha.getTime() - new Date().getTime())/(1000 * 3600 * 24));

  for (i = 0; i < articulos.length; i++) {
    var aux = articulos[i];
    for (j = 0; j < inventario.length; j++) {
      if (aux.codigoProducto === inventario[i].codigoArticulo) {
        resto = inventario[i].cantidad - aux.cantidad - Math.round((cantidadDias * consumo[i].consumoDiario))
        if (resto < 0) {
          articulosNecesarios.push({
            articulo: aux.codigoProducto,
            cantidad: resto * -1,
            precio: inventario.precio
          })
        }
        break;
      }
    }
  }
  return articulosNecesarios;
}
const suplidorCercano = async function(articulo, fecha){
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