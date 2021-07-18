const { Router } = require('express');
const router = Router();


const { getOrden, getOrdenes, createOrden, updateOrden, deleteOrden} = require('../controllers/ordenCompra.controller');

router.route('/')
    .get(getOrdenes)
    .post(createOrden);

router.route('/:id')
    .get(getOrden)
    .put(updateOrden)
    .delete(deleteOrden);

module.exports = router;