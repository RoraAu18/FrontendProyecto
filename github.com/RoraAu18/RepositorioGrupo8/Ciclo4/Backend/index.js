//llamados de librerias
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

//Aqui voy a crear el servidor
const app = express();

//conectamos a la base de datos
conectarDB();
app.use(cors());//permite compartir informacion emtre los servidores front y back (puertos 3000 E y 4200 A)
app.use(express.json());//permite que los datos sean enviados en formato json
app.use('/api', require('./routes'));//ruta al login
app.use('/api/clientes', require('./routes/cliente'));//ruta al cliente
app.use('/api/productos', require('./routes/producto'));//ruta a productos

//compruebo que el servidor esta corriendo
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
