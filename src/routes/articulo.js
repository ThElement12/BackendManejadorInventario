const { Router } = require('express');
const router = Router();

const { getArticulo, getArticulos, getArticulosTotales, createArticulo, updateArticulo, deleteArticulo } = require('../controllers/articulo.controller');

router.route('/total')
  .get(getArticulosTotales)


router.route('/')
  .get(getArticulos)
  .post(createArticulo);


router.route('/:id')
  .get(getArticulo)
  .put(updateArticulo)
  .delete(deleteArticulo);

module.exports = router;