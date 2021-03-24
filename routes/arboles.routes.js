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
    .get(arbolesController.taxonomiaArbolesGetAll)
    .post(arbolesController.taxonomiaCreate)

router.route('/tiposArboles/:folio')
    .get(arbolesController.taxonomiaGetSingle)
    .put(arbolesController.taxonomiaEdit)
    .delete(arbolesController.taxonomiaDelete)

router.route('/imagenes')
    .get(arbolesController.imagenesArbolesGetAll)
    .post(arbolesController.imagenArbolCreate)

router.route('/imagenes/:folio')
    .get(arbolesController.imagenArbolGetSingle)
    .put(arbolesController.imagenArbolEdit)
    .delete(arbolesController.imagenArbolDelete)

router.route('/inspeccion')
    .get(arbolesController.inspeccionArbolesGetAll)

router.route('/inventario')
    .get(arbolesController.inventarioArbolesGetAll)
    .post(arbolesController.inventarioCreate)

router.route('/inventario/:folio')
    .get(arbolesController.inventarioArbolGetSingle)
    .put(arbolesController.inventarioArbolEdit)
    .delete(arbolesController.inventarioArbolDelete)

router.route('/jardines')
    .get(arbolesController.jardinesArbolesGetAll)
    .post(arbolesController.jardinCreate)

router.route('/jardines/:folio')
    .get(arbolesController.jardinGetSingle)
    .put(arbolesController.jardinEdit)
    .delete(arbolesController.jardinDelete)

router.route('/getAllNodosArboles')
    .get(arbolesController.nodosArbolesGetAll)

router.route('/rutas')
    .get(arbolesController.rutaArbolesGetAll)




module.exports = router;