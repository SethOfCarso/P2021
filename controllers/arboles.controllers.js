'use strict';

const mysql = require('mysql2');
const connection = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DB,
    // port: process.env.DB_PORT
});

class UserController {

    // async usuarioLogin(req, res) {
    //     let query = {} // Search by name or uid
    //     let options = {} // Page or limit
    //     let projection = ""; // Which fields are wanted
    //     const searchedUsuarioBody = req.body;
    //     const email = searchedUsuarioBody.email;
    //     const pass = searchedUsuarioBody.password;
    //     connection.query(
    //         "SELECT * FROM `usuarios_cliente` WHERE `email` = " + "\'" + email + "\'",
    //         // "SELECT id_UserClient,Nombre , Usuario , id_Empresa , Empresa , email , rol  FROM `usuarios_cliente` WHERE `email` = " + "\'" + email + "\'" ,
    //         function (err, results, fields) {
    //             if (results.length > 0) {
    //                 if (results[0].Password == pass) {
    //                     res.status(200)
    //                     res.json({
    //                         id_UserClient: results[0].id_UserClient,
    //                         Nombre: results[0].Nombre,
    //                         id_Empresa: results[0].id_Empresa,
    //                         Empresa: results[0].Empresa,
    //                         email: results[0].email,
    //                         rol: results[0].rol
    //                     });
    //                 } else {
    //                     res.status(200)
    //                     res.json({
    //                         mensaje: "Usuario y/o contraseña incorrecta"
    //                     })
    //                 }
    //             } else {
    //                 res.status(200);
    //                 res.json({
    //                     mensaje: "Usuario y/o contraseña incorrecta"
    //                 })
    //             }
    //         }
    //     );
    // }

    // async createUser(req, res) {
    //     let query = {} // Search by name or uid
    //     let options = {} // Page or limit
    //     let projection = ""; // Which fields are wanted
    //     const searchedUsuarioBody = req.body;
    //     const id_UserClient = searchedUsuarioBody.id_UserClient;
    //     const Nombre = searchedUsuarioBody.Nombre;
    //     const Usuario = searchedUsuarioBody.Usuario;
    //     const Password = searchedUsuarioBody.Password;
    //     const id_Empresa = searchedUsuarioBody.id_Empresa;
    //     const Empresa = searchedUsuarioBody.Empresa;
    //     const email = searchedUsuarioBody.email;
    //     const rol = searchedUsuarioBody.rol;
    //     connection.query(
    //         "INSERT INTO `usuarios_cliente` (`id_UserClient` , `Nombre`, `Usuario`, `Password` , `id_Empresa`, `Empresa`, `email`, `rol`) VALUES ( " +
    //         "\'" + id_UserClient + "\'," + "\'" + Nombre + "\' ," + "\'" + Usuario + "\' ," + "\'" + Password + "\' ," + "\'" + id_Empresa + "\' ," + "\'" + Empresa + "\' ," + "\'" + email + "\' ," + "\'" + rol + "\' " + " )",
    //         function (err, results, fields) {
    //             if (results != undefined) {
    //                 if (results.affectedRows == 0) {
    //                     res.status(401)
    //                     res.json({
    //                         mensaje: "No fue posible crear el usuario"
    //                     })
    //                 } else if (results.affectedRows == 1) {
    //                     res.status(201)
    //                     res.json({
    //                         mensaje: "Se creo el usuario exitosamente"
    //                     })
    //                 }
    //             } else {
    //                 res.status(401)
    //                 res.json({
    //                     mensaje: "Ya existe ese usuario"
    //                 })
    //             }
    //         }
    //     );
    // }
    // async updateUser(req, res) {
    //     if (req.params.folio !== undefined) {
    //         const folio = req.params.folio;
    //         if (req.body !== undefined) {
    //             const bodyActualizaciones = req.body;
    //             let toUpdate = "";
    //             let objEntries = Object.keys(bodyActualizaciones);
    //             //Object.values no existe, se uso un map
    //             let values = Object.keys(bodyActualizaciones).map(e => bodyActualizaciones[e])
    //             for (let i = 0; i < objEntries.length; i++) {
    //                 if (i >= 1) {
    //                     toUpdate = toUpdate + " , ";
    //                 }
    //                 toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  "${ values[i]}"`;
    //             }
    //             // console.log("Tu update " + toUpdate);
    //             connection.query(
    //                 "UPDATE `usuarios_cliente` SET " + toUpdate + " WHERE `usuarios_cliente`.`id_UserClient` = " + folio,
    //                 function (err, results, fields) {
    //                     if (err) {
    //                         err.mensaje = "Encontramos un error en tu peticion al parecer tu folio no es un numero valido";
    //                         res.send(err)
    //                     }
    //                     res.status(201)
    //                     res.send(results)
    //                     // console.log(results); // results contains rows returned by server
    //                     // console.log(fields); // fields contains extra meta data about results, if available
    //                 }
    //             );
    //         } else {
    //             res.status(401)
    //             res.send({
    //                 err: "No se encontro algun dato en el body de la peticion"
    //             });
    //         }

    //     } else {
    //         res.status(401)
    //         res.send({
    //             err: "No es un folio valido en nuestra Base de datos"
    //         });
    //     }
    // }

    // async deleteUser(req, res) {
    //     let query = {} // Search by name or uid
    //     let options = {} // Page or limit
    //     let projection = ""; // Which fields are wanted
    //     const searchedUsuarioBody = req.body;
    //     const user = searchedUsuarioBody.Usuario;
    //     connection.query(
    //         "DELETE FROM `usuarios_cliente` WHERE `usuarios_cliente`.`Usuario` = " + "\'" + user + "\'",
    //         function (err, results, fields) {
    //             // console.log(results);
    //             if (results != undefined) {
    //                 if (results.affectedRows == 0) {
    //                     res.status(401)
    //                     res.json({
    //                         mensaje: "No fue posible borrar el usuario"
    //                     })
    //                 } else if (results.affectedRows == 1) {
    //                     res.status(201)
    //                     res.json({
    //                         mensaje: "Se elimino el usuario exitosamente"
    //                     })
    //                 }
    //             }
    //         }
    //     );
    // }

    // async getAllUsers(req, res) {
    //     let query = {} // Search by name or uid
    //     let options = {} // Page or limit
    //     let projection = ""; // Which fields are wanted
    //     const searchedUsuarioBody = req.body;
    //     const user = searchedUsuarioBody.user;
    //     const pass = searchedUsuarioBody.password;
    //     connection.query(
    //         "SELECT Nombre, Usuario, Empresa, email, rol FROM `usuarios_cliente`",
    //         function (err, results, fields) {
    //             res.status(200)
    //             res.json(results)
    //         }
    //     );
    // }



}

const userControllerClass = new UserController();
module.exports = userControllerClass;