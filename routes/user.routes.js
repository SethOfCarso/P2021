'use strict';

const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/test')
    .get(userController.testUser)

router.route('/hey')
    .get(
        (req, res) =>{
            res.send("hola")
        }
    )


module.exports = router;