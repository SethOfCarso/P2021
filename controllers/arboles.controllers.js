'use strict';
const express = require('express');
const mysql = require('mysql2');
const  connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DB
});

connection.connect();

class arbolesController {

    /**
     * Obtener todas las taxonimias de la base de datos de arboles.
     * @param {*} req  - No recibe ningun parametro.
     * @param {*} res  - Es nuestra respuesta del servidor a mandar.
     */
    async getAllTaxonomiaArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_taxonomias` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }
    /**
     * Es para obtener la relacion de los arboles con sus imagenes.
     * @param {*} req No recibe nada es un endpoint.
     * @param {*} res Responde con toda la base de datos.
     */

    async getAllImagenesArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_imagenes` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }
    /**
     * Obtiene los datos con los que se relacionara con el nodo de arboles
     * del semestre que paso.
     * @param {*} req No recibe nada
     * @param {*} res Brinda id_captura, id_nodo (Relacionara con la otra BDD), id_red, fecha 
     */

    async getAllInspeccionArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inspeccion` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todos los datos referentes al arbol
     * @param {*} req No recibe ningun parametro
     * @param {*} res Responde con NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen.
     */

    async getAllInventarioArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene la informacion de los jardines.
     * @param {*} req No recibe ningun parametro.
     * @param {*} res Responde con id_jardin y nombre.
     */

    async getAllJardinesArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todos los nodos de los arboles.
     * @param {*} req No recibe ningun parametro.
     * @param {*} res Responde con id_nodo y NID.
     */

    async getAllNodosArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_nodos` "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */

    async getAllRutaArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_ruta`  "
        connection.query(
            stringQuery, 
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Se realizo un test para probar el funcionamiento basico.
     * @param {*} req 
     * @param {*} res 
     */

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