'use strict';

const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/login')
    .post(userController.usuarioLogin)


router.route('/allLogins')
    .get(userController.getAllUsers)

router.route('/singleUser/:id')
    .get(userController.singleUserByID)


module.exports = router;