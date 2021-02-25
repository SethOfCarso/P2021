'use strict';
const express = require('express');

class userController {

    async testUser(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        res.json({mensaje:"Hola desde user"})
    }

}

const userControllerClass = new userController();
module.exports = userControllerClass;