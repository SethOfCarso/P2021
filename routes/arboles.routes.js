'use strict';

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');

router.route('/tiposArboles')
    .get(arbolesController.getAllTaxonomiaArboles)

router.route('/holaArbol')
    .get(arbolesController.holaArbol)

router.route('/hey')
    .get(
        (req, res) =>{
            res.send("hola")
        }
    )


module.exports = router;