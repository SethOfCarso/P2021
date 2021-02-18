'use strict';

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');


router.route('/arboles')

router.route('/tiposArboles')
    .get(arbolesController.getAllTaxonomiaArboles)


module.exports = router;