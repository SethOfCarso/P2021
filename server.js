/**
 * Modulo principal para Primavera 2020
 */
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 80;
const dot = require('dotenv').config()
const mysql = require('mysql2');

//DB connection
const  connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DB,
  port: process.env.DB_PORT 
});

//swagger
//https://www.npmjs.com/package/swagger-ui-express

// ====================================
// Routes
// ====================================

// ====================================
// Middleware
// ====================================
const app = express();
app.use(cors());
app.use(express.json());


// ====================================
// Basic API for test purposes
// ====================================

app.get('/P2021API', function (req, res) {
  res.send('Back end para Primavera 2021')
})

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message , err);
  }
  console.log('Connected to the MySQL server.');
});



app.listen(port, () => console.log("http://localhost:" + port));