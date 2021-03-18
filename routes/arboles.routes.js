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
    .get(arbolesController.getSingleTaxonomia)
    .put(arbolesController.editTaxonomia)
    .delete(arbolesController.deleteTaxonomia)

router.route('/imagenes')
    .get(arbolesController.getAllImagenesArboles)
    .post(arbolesController.addImagenArbol)

router.route('/imagenes/:folio')
    .get(arbolesController.getSingleImagen)
    .put(arbolesController.editImagenArbol)
    .delete(arbolesController.deleteImagenArbol)

router.route('/inspeccion')
    .get(arbolesController.getAllInspeccionArboles)

router.route('/inventario')
    .get(arbolesController.getAllInventarioArboles)
    .post(arbolesController.createInventario)

router.route('/inventario/:folio')
    .get(arbolesController.getSingleInventarioArbol)
    .put(arbolesController.updateInventarioArbol)
    .delete(arbolesController.deleteInventarioArbol)

router.route('/jardines')
    .get(arbolesController.getAllJardinesArboles)
    .post(arbolesController.createJardin)

router.route('/jardines/:folio')
    .get(arbolesController.getSingleJardin)
    .put(arbolesController.updateJardin)
    .delete(arbolesController.deleteJardin)

router.route('/getAllNodosArboles')
    .get(arbolesController.getAllNodosArboles)

router.route('/rutas')
    .get(arbolesController.getAllRutaArboles)




module.exports = router;