const Producto = require("../models/Productos");

exports.crearProducto = async (req, res) => {
    try {
        let producto;
        //aqui vamos a crear el producto
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);
        console.log(req.body);

    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}
exports.obtenerProductos = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
    console.log(req.body);
}
exports.actualizarProducto = async (req, res) => {
    try {
        const { codigo_producto, nombre_producto, nitproveedor, precio_compra, ivacompra, precio_venta } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'El producto no existe'});
        }

        producto.codigo_producto = codigo_producto;
        producto.nombre_producto = nombre_producto;
        producto.nitproveedor = nitproveedor;
        producto.precio_compra = precio_compra;
        producto.ivacompra = ivacompra;
        producto.precio_venta = precio_venta;

        producto = await Producto.updateOne({ _id: req.params.id }, producto, { new: true });
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'El producto no existe'});
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'El producto no existe'});
        }
        await Producto.remove({ _id: req.params.id });
        res.json({msg: 'El producto ha sido eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}