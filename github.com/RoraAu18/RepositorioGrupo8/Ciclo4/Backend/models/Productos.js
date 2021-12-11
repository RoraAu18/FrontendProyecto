// aqui voy a crear el modelo de productos
const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    codigo_producto: {
        type: Number,
        required: true
    },
    nombre_producto: {
        type: String,
        required: true
    },
    nitproveedor: {
        type: Number,
        required: true
    },
    precio_compra: {
        type: Number,
        required: true
    },
    ivacompra: {
        type: Number,
        required: true
    },
    precio_venta: {
        type: Number,
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Producto', ProductoSchema);