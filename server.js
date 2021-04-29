/**
 * Modulo principal para Primavera 2020
 */
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
// const port = process.env.PORT || 80;
//const dot = require('dotenv').config()
const mysql = require('mysql2');
const  connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DB,
  port: process.env.DB_PORT 
});

connection.connect();


// ====================================
// Routes
// ====================================

const arbolesRotuer = require('./routes/arboles.routes');
const userRouter = require('./routes/user.routes');
const rutesRouter = require('./routes/rutes.routes');


// ====================================
// Middleware
// ====================================
const app = express();
app.use(cors());
app.use(express.json());

app.use('/P2021API/api/user', userRouter);
app.use('/P2021API/api/arboles', arbolesRotuer);
app.use ('/P2021API/api/rutas', rutesRouter);


// ====================================
// Basic API for test purposes
// ====================================

/** Representa la funcion basica de que el Back End este funcionando  y probar que funciona JSDOCS*/
app.get('/P2021API', function (req, res) {
  res.json({
    finalidad : 'Back end para Primavera 2021 con SQL'
  })
})

// ====================================
// Basic BD for test purposes
// ====================================


app.listen(port, () => console.log("http://localhost:" + port));