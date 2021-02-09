/**
 * Modulo principal para Primavera 2020
 */
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', function (req, res) {
  res.send('Back end para Primavera 2021')
})

app.listen(port, () => console.log("http://localhost:" + port));