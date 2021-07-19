const { Router } = require('express');
const router = Router();

const { getArticulo, getArticulos, createArticulo, updateArticulo, deleteArticulo} = require('../controllers/articulo.controller');

router.route('/')
    .get(getArticulos)
    .post(createArticulo);

router.route('/:id')
    .get(getArticulo)
    .put(updateArticulo)
    .delete(deleteArticulo);

module.exports = router;