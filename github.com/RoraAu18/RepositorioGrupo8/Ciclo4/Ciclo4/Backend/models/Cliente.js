//aqui voya crear el modelo de producto
const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    cedula: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Cliente', ClienteSchema);