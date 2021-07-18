const { Router } = require('express');
const router = Router();


const { getMovimiento, getMovimientos, createMovimiento, updateMovimiento, deleteMovimiento} = require('../controllers/movimiento.controllers');

router.route('/')
    .get(getMovimientos)
    .post(createMovimiento);

router.route('/:id')
    .get(getMovimiento)
    .put(updateMovimiento)
    .delete(deleteMovimiento);

module.exports = router;