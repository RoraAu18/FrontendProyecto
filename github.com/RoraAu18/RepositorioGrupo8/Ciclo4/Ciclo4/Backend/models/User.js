//aqui voy a crear el modelo de usuario
const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    usuario: String,
    password: String,
},{
    timestamps: true
});

module.exports = model('User', userSchema);