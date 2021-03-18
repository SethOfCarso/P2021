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
     * @param {JSON} res  - Es nuestra respuesta del servidor a mandar.
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
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma {"taxonomia" : "Nombre de la taxonomia a insertar"}.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
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
     * Obtener un registro de la Taxonomia de arboles.
     * @async
     * @exports getSingleTaxonomia
     * @param {*} req - No recibe nada en los parametros.
     * @param {JSON} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async getSingleTaxonomia(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_taxonomias` WHERE `id_taxonomia` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del arbol"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }


    /**
     * Editar algun registro de Taxonomia 
     * @async
     * @exports editTaxonomia
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body sea de la forma {"taxonomia" : "Nombre de la nueva taxonomia"}
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
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
     * @param {string} res - Si recibe un ID invalido 
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
                            msg: "Se elimino correctamente el nombre de la lista actual"
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
     * Es para obtener la relacion de los arboles con sus imagenes.
     * @async
     * @exports getAllImagenesArboles
     * @param {*} req No recibe nada es un endpoint.
     * @param {JSON} res Responde con toda la base de datos.
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
     * 
     * Es para añadir una imagen a la Base de datos
     * @async
     * @exports addImagenArbol
     * @param {JSON} req Recibe un nombre de imagen e NID en un JSON que hace relacion con el inventario de arboles.{"nombreImagen:"Nombre de la imagen, "NID": #### }
     * @param {string} res  Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async addImagenArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        const imagenArbol = body.nombreImagen;
        const NID = body.NID;
        let stringQuery = "INSERT INTO `rssy_arboles_imagenes` (`id_imagen`, `imagen`, `NID`) VALUES (NULL, '" + imagenArbol + "', '" + NID + "'); "
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
                        msg: "Se agrego correctamente a la base de datos."
                    })
                }
            }
        );
    }

    /**
     * Obtiene un arbol en especifico de la base de datos a través de su folio.
     * @async
     * @exports getSingleImagen
     * @param {*} req - No recibe nada en el request ya que busca desde el URL.
     * @param {JSON} res - Responde con el ID, nombre de la imagen y su NID(Hace referencia al inventario de arboles).
     */

    async getSingleImagen(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_imagenes` WHERE `id_imagen` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del arbol"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }

    /**
     * Editar algun registro de Taxonomia 
     * @async
     * @exports editImagenArbol
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body con lo que se desea editar en un JSON, los campos son imagen o NID.
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos y si todo sale correcto manda un mensaje de correcto.
     */
    async editImagenArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let taxononimiaName = body.taxonomia;

        if (req.params.folio !== undefined) {
            const folioID = req.params.folio;
            if (req.body !== undefined) {
                const bodyActualizaciones = req.body;
                let toUpdate = "";
                let objEntries = Object.keys(bodyActualizaciones);
                let values = Object.keys(bodyActualizaciones).map(e => bodyActualizaciones[e])
                for (let i = 0; i < objEntries.length; i++) {
                    if (i >= 1) {
                        toUpdate = toUpdate + " , ";
                    }
                    if (typeof (values[i]) == 'string') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  "${ values[i]}" `;
                    }
                    if (typeof (values[i]) == 'number') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  ${ values[i]} `;
                    }

                }

                let stringQuery = "UPDATE `rssy_arboles_imagenes` SET " + toUpdate + " WHERE `id_imagen` = " + folioID + ""
                //res.send(stringQuery)
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
                                msg: "Se edito correctamente el folio " + folioID
                            })
                        }
                    }
                );
            }
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }
    }

    /**
     * Eliminar algun registro de Taxonomia 
     * @async
     * @exports deleteImagenArbol
     * @param {*} req - Recibe en el URL solo el Folio necesario a eliminar.
     * @param {string} res - Si recibe un ID invalido manda error, si se encuentra correcto se elimna y manda un mensaje de que se elimino correctamente.
     */
    async deleteImagenArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            // DELETE FROM `rssy_arboles_imagenes` WHERE `rssy_arboles_imagenes`.`id_imagen` = 7275"
            let stringQuery = "DELETE FROM `rssy_arboles_imagenes` WHERE `rssy_arboles_imagenes`.`id_imagen` = " + folioID + ""
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
                            msg: "Se elimino correctamente la imagen de la base de datos."
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
     * Obtiene los datos con los que se relacionara con el nodo de arboles
     * @async
     * @exports getAllInspeccionArboles
     * del semestre que paso.
     * @param {*} req No recibe nada
     * @param {JSON} res Brinda id_captura, id_nodo (Relacionara con la otra BDD), id_red, fecha 
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
     * @param {string} res Responde con NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen.
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
     * Crea un nuego registro para la parte de inventario de los arboles.
     * @async
     * @exports createInventario
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma 
     * {"id_taxonomia" : ####, (int 11) , (Hace relacion con la BDD de id taxonomia)
     * "Plantado" : "Año de plantado", (int 11)
     * "Diametro": "Diametro del arbol", (float)
     * "Altura": "Altura del arbol", (float)
     * "Valoracion": "Diametro del arbol", (int 4)
     * "Latitud" : "Donde se encuentra" , (varchar40)
     * "Longitud" : "Donde se encuentra" , (varchar40)
     * "id_jardin" : #### , (int 11)
     * "imagen" : "Ruta de la imagen" , (varchar 200)
     * }.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async createInventario(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let NID = 1;
        const idTaxonomia = body.id_taxonomia;
        const Plantado = body.Plantado;
        const Diametro = body.Diametro;
        const Altura = body.Altura;
        const Valoracion = body.Valoracion;
        const Latitud = body.Latitud;
        const Longitud = body.Longitud;
        const id_jardin = body.id_jardin;
        const imagen = body.imagen;
        connection.query(
            "SELECT NID FROM `rssy_arboles_inventario` ORDER BY `NID` DESC LIMIT 1 ",
            function (err, results, field) {
                NID = results[0].NID + 1
                // res.send(results[0].NID)
                if (results !== undefined) {
                    //INSERT INTO `rssy_arboles_inventario` (`NID`, `id_taxonomia`, `Plantado`, `Diametro`, `Altura`, `Valoracion`, `Latitud`, `Longitud`, `id_jardin`, `imagen`) VALUES ('3768', '3', '2021', '23.0', '456.1', '15', '454465', '212231321', '1', 'hye.jpg') 
                    let stringQuery = "INSERT INTO `rssy_arboles_inventario` (`NID`, `id_taxonomia`, `Plantado`, `Diametro`, `Altura`, `Valoracion`, `Latitud`, `Longitud`, `id_jardin`, `imagen`) VALUES ('" + NID + "', '" + idTaxonomia + "', '" + Plantado + "'," +
                        "'" + Diametro + "', '" + Altura + "', '" + Valoracion + "', '" + Latitud + "', '" + Longitud + "', '" + id_jardin + "', '" + imagen + "') "
                    connection.query(
                        stringQuery,
                        function (err, results, fields) {
                            if (err) {
                                res.status(501)
                                res.json({
                                    msg: "Hubo un error en su petición, favor de verificar los datos agregados "
                                })
                                
                            }
                            if (results.affectedRows == 1) {
                                res.status(200)
                                res.json({
                                    msg: "Se agrego satisfactoriametne el arbol agregado" 
                                })
                            }
                        }
                    );

                } else {
                    res.status(202)
                    res.send("Hubo un error al momento de obtener el ultimo numero de la Base de datos, intente mas tarde.")
                }
            }
        )
    }


    /**
     * Obtiene todos los datos referentes al arbol que se busca
     * @async
     * @exports getSingleInventarioArbol
     * @param {*} req No recibe ningun parametro
     * @param {JSON} res Responde con NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen.
     */

    async getSingleInventarioArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` WHERE `NID` = " + folioID
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de checar el folio del inventario"
                        })
                    }
                    if (results != undefined) {
                        res.status(200)
                        res.json(results)
                    }
                }
            );
    }


    /**
     * Actualiza todos los datos que se manda en un body al arbol.
     * @async
     * @exports updateInventarioArbol
     * @param {JSON} req Todo lo que recibe en un JSOn de NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen, es lo que actualiza.
     * @param {string} res Responde un mensaje de error o valdio dependiendo el caso.
     */

    async updateInventarioArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        if (req.params.folio !== undefined) {
            const folioID = req.params.folio;
            if (req.body !== undefined) {
                const bodyActualizaciones = req.body;
                let toUpdate = "";
                let objEntries = Object.keys(bodyActualizaciones);
                let values = Object.keys(bodyActualizaciones).map(e => bodyActualizaciones[e])
                for (let i = 0; i < objEntries.length; i++) {
                    if (i >= 1) {
                        toUpdate = toUpdate + " , ";
                    }
                    if (typeof (values[i]) == 'string') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  "${ values[i]}" `;
                    }
                    if (typeof (values[i]) == 'number') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  ${ values[i]} `;
                    }

                }

                let stringQuery = "UPDATE `rssy_arboles_inventario` SET " + toUpdate + " WHERE `NID` = " + folioID + ""
                //res.send(stringQuery)
                connection.query(
                    stringQuery,
                    function (err, results, fields) {
                        if (err) {
                            res.status(501)
                            res.json({
                                msg: "Hubo un error en su petición, favor de verificar los datos que agrego."
                            })
                        }
                        if (results.affectedRows == 1) {
                            res.status(200)
                            res.json({
                                msg: "Se edito correctamente el folio " + folioID + " respecto al inventario de arboles"
                            })
                        }
                    }
                );
            }
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }
    }


    /**
     * Se plantea borrar un arbol del inventario pero se pidio que no existiera tal opcion.
     * @async
     * @exports deleteInventarioArbol
     * @param {*} req Recibe un folio al cual borrar.
     * @param {string} res Responde con un mensaje que no se puede eliminar un arbol.
     */

    async deleteInventarioArbol(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json({
                    msg: "Soy delete inventario, por el momento se quedara asi para no borar arboles"
                })
            }
        );
    }

    /**
     * Obtiene la informacion de todos los jardines.
     * @async
     * @exports getAllJardinesArboles
     * @param {*} req No recibe ningun parametro.
     * @param {JSON} res Responde con id_jardin y nombre.
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
     * Se utilzia esta funcion como su nombre lo menciona que es para crear un nuevo Jardin.
     * @async
     * @exports createJardin
     * @param {JSON} req Recibe en un body todos los datos de jardin necesarios para crearlo 
     * {
     * "id_jardin" : ### (int 11), no es necesario mandarlo ya que se obtiene automaticamente
     * "nombre" : varchar(200)
     * }
     * @param {String} res Responde con un mensaje si salio correcto o cual es el error.
     */

         async createJardin(req, res) {
            let query = {} // Search by name or uid
            let options = {} // Page or limit
            let projection = ""; // Which fields are wanted
            const body = req.body;
            let idJardin = 1;
            const nombreJardin = body.nombre;
            connection.query(
            "SELECT id_jardin FROM `rssy_arboles_jardines` ORDER BY `id_jardin` DESC LIMIT 1 ",
            function (err, results, field) {
                idJardin = results[0].id_jardin + 1
            let stringQuery = "INSERT INTO `rssy_arboles_jardines` (`id_jardin`, `nombre`) VALUES ('"+idJardin+"', '"+nombreJardin+"');"
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de verificar los datos agregados" 
                        })
                        
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se agrego satisfactoriametne el jardin agregado" 
                        })
                    }
                }
            );
            }
            );
        }

            /**
     * Obtiene la informacion de los un jardin que se obtiene a traves del folio que se manda en el URL.
     * @async
     * @exports getSingleJardin
     * @param {*} req No recibe ningun parametro
     * @param {JSON} res Responde con id_jardin y nombre si lo encuentra.
     */

    async getSingleJardin(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` WHERE `id_jardin` = " + folioID
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de checar el folio del jardin"
                        })
                    }
                    if (results != undefined) {
                        res.status(200)
                        res.json(results)
                    }
                }
            );
    }

    /**
     * Actualiza todos los datos que se manda en un body a jardin.
     * @async
     * @exports updateJardin
     * @param {JSON} req Recibe en un body tipo JSON los datos a actualizar
     * @param {string} res Responde con mensaje si fue satisfactorio o hubo un error.
     */

         async updateJardin(req, res) {
            let query = {} // Search by name or uid
            let options = {} // Page or limit
            let projection = ""; // Which fields are wanted
            let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    res.status(200)
                    res.json({msg:"Es le update de Jardin falta implementar"})
                }
            );
        }

            /**
     * Funcion con el fin de eliminar jardines, no se implementara a peticion del profesor.
     * @async
     * @exports deleteJardin
     * @param {*} req No recibe ningun parametro.
     * @param {string} res Responde con un mensaje de que no se implementara.
     */

    async deleteJardin(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json({msg:"Este es delete de Jardin, no se implementa por peticion del profesor."})
            }
        );
    }


    /**
     * Obtiene todos los nodos de los arboles.
     * @async
     * @exports getAllNodosArboles
     * @param {*} req No recibe ningun parametro.
     * @param {JSON} res Responde con id_nodo y NID.
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
     * @param {JSON} res - Devuelve todas las rutas de los arboels en la BDD
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