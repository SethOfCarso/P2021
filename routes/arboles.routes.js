'use strict';

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');

router.route('/tiposArboles')
    .get(arbolesController.getAllTaxonomiaArboles)

router.route('/imagenes')
    .get(arbolesController.getAllImagenesArboles)

router.route('/inspeccion')
    .get(arbolesController.getAllInspeccionArboles)

router.route('/inventario')
    .get(arbolesController.getAllInventarioArboles)

router.route('/jardines')
    .get(arbolesController.getAllJardinesArboles)

router.route('/getAllNodosArboles')
    .get(arbolesController.getAllNodosArboles)

router.route('/rutas')
    .get(arbolesController.getAllRutaArboles)




module.exports = router;