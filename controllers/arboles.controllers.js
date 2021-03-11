'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de arboles.
 * Este archivo contiene todos los endpoints del controlador de arboles.
 * @author Erick Cardona Soto Maynez <cardona.erick@hotmail.com>
 */

const express = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

connection.connect();

class arbolesController {

    /**
     * Obtener todas las taxonimias de la base de datos de arboles para hacer una lista desplegable.
     * @async
     * @exports getAllTaxonomiaArboles
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
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en el sistema, intente nuevamente mas tarde."
                    })
                }
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Añadir un nuevo registro de Taxonomia de los arboles
     * @async
     * @exports addTaxonomia
     * @param {*} req - Debe recibir en el Body un JSON de la forma {"taxonomia" : "Nombre de la taxonomia a insertar"}.
     * @param {*} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async addTaxonomia(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let taxononimiaName = body.taxonomia;
        let stringQuery = "INSERT INTO `rssy_arboles_taxonomias` (`id_taxonomia`, `nombre`) VALUES (NULL, '" + taxononimiaName + "'); "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de verificar el nombre que agrego"
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agrego correctamente el nombre a la lista de taxonomias actuales"
                    })
                }
            }
        );
    }


    /**
     * Editar algun registro de Taxonomia 
     * @async
     * @exports editTaxonomia
     * @param {*} req - Recibe en el URL el ID a editar, con un body sea de la forma {"taxonomia" : "Nombre de la nueva taxonomia"}
     * @param {*} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
    async editTaxonomia(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let taxononimiaName = body.taxonomia;
        if (folioID !== undefined) {
            let stringQuery = "UPDATE `rssy_arboles_taxonomias` SET `nombre` = ' " + taxononimiaName + " ' WHERE `rssy_arboles_taxonomias`.`id_taxonomia` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de verificar el nombre que agrego."
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se agrego edito el nombre correctamente en la lista actual."
                        })
                    }
                }
            );
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }

    }

    /**
     * Eliminar algun registro de Taxonomia 
     * @async
     * @exports deleteTaxonomia
     * @param {*} req - Recibe en el URL solo el Folio necesario.
     * @param {*} res - Si recibe un ID invalido 
     */
    async deleteTaxonomia(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            let stringQuery = "DELETE FROM `rssy_arboles_taxonomias` WHERE `rssy_arboles_taxonomias`.`id_taxonomia` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de intetar mas tarde"
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se agrego elimino correctamente el nombre de la lista actual"
                        })
                    }
                }
            );
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }

    }




    /**
     * @async
     * @exports getAllImagenesArboles
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
     * @async
     * @exports getAllInspeccionArboles
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
     * @async
     * @exports getAllInventarioArboles
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
     * @async
     * @exports getAllJardinesArboles
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
     * @async
     * @exports getAllNodosArboles
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
     * Obtiene todas las rutas de los arboles
     * @async
     * @exports getAllRutaArboles
     * @param {*} req - No recibe ningun parametro
     * @param {*} res - Devuelve todas las rutas de los arboels en la BDD
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

}

const arbolesControllerClass = new arbolesController();
module.exports = arbolesControllerClass;