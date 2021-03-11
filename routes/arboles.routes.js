'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del rutas de arboles.
 * Este archivo contiene todas las rutas para arboles.
 * @author Erick Cardona Soto Maynez <cardona.erick@hotmail.com>
 */

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');

router.route('/tiposArboles')
    .get(arbolesController.getAllTaxonomiaArboles)
    .post(arbolesController.addTaxonomia)

router.route('/tiposArboles/:folio')
    .put(arbolesController.editTaxonomia)
    .delete(arbolesController.deleteTaxonomia)

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