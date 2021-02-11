'use strict';

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');


router.route('/arboles')
    .post(arbolesController.usuarioLogin)



module.exports = router;