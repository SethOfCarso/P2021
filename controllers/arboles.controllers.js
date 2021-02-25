'use strict';
const express = require('express');

class arbolesController {

    async getAllTaxonomiaArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_taxonomias` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllImagenesArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_imagenes` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllInspeccionArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_inspeccion` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllInventarioArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllJardinesArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllNodosArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_nodos` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async getAllRutaArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        stringQuery = "SELECT * FROM `rssy_arboles_ruta`  "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    async holaArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        res.status(200);
        res.json({mensaje: "hola"})
    }

}

const arbolesControllerClass = new arbolesController();
module.exports = arbolesControllerClass;