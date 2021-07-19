const { Router } = require('express');
const router = Router();

const { getSuplidor, getSuplidores, createSuplidor, updateSuplidor, deleteSuplidor} = require('../controllers/suplidor.controller');

router.route('/')
    .get(getSuplidores)
    .post(createSuplidor);

router.route('/:id')
    .get(getSuplidor)
    .put(updateSuplidor)
    .delete(deleteSuplidor);

module.exports = router;