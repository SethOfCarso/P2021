'use strict';
const express = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

connection.connect();

class userController {

    /**
     * Funcion que checa el login del usuario, dependiendo de los datos internos del Body.
     * @param {*} req Recibe en el cuerpo un body.
     * @param {*} res Responde si encuentra la informacion del usuario, sino mensajes de error.
     */
    async usuarioLogin(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const searchedUsuarioBody = req.body;
        const email = searchedUsuarioBody.email;
        const pass = searchedUsuarioBody.password;
        connection.query(
            "SELECT * FROM `arboles_usuarios` WHERE `Email` = " + "\'" + email + "\'",
            // "SELECT id_UserClient,Nombre , Usuario , id_Empresa , Empresa , email , rol  FROM `usuarios_cliente` WHERE `email` = " + "\'" + email + "\'" ,
            function (err, results, fields) {
                if (results.length > 0) {
                    if (results[0].Password == pass) {
                        res.status(200)
                        res.json({
                            id_UserClient: results[0].id_UserClient,
                            Nombre: results[0].Nombre,
                            id_Empresa: results[0].id_Empresa,
                            Empresa: results[0].Empresa,
                            email: results[0].email,
                            rol: results[0].rol
                        });
                    } else {
                        res.status(200)
                        res.json({
                            mensaje: "Usuario y/o contraseña incorrecta"
                        })
                    }
                } else {
                    res.status(200);
                    res.json({
                        mensaje: "Usuario y/o contraseña incorrecta"
                    })
                }
            }
        );
    }

    /**
     * Lista de todos los usuarios para que los administradores puedan tener control de ellos.
     * @param {*} req No recibe nada.
     * @param {*} res Responde con idUser, Name, LastName, Rol, Email.
     */
    async getAllUsers(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        connection.query(
            "SELECT `idUser`, `Name` ,`LastName`,`Rol`,`Email`  FROM `arboles_usuarios` ",
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }


    /**
     * Obtener los datos de un usuario en particular.
     * @param {*} req Necesita el id del usuario para obtenerlo.
     * @param {*} res Responde con idUser, Name, LastName, Rol, Email.
     */
    async singleUserByID(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const idUser = req.params.id;
        connection.query(
            "SELECT `idUser`, `Name` ,`LastName`,`Rol`,`Email`  FROM `arboles_usuarios` WHERE `idUser` = " + "\'" + idUser + "\'",
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );

    }

}

const userControllerClass = new userController();
module.exports = userControllerClass;