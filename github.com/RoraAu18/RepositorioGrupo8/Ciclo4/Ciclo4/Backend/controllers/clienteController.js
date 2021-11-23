const Cliente = require("../models/Cliente");


exports.crearCliente = async (req, res) => {
    try {
        let cliente;
        //aqui vamos a crear el cliente
        cliente = new Cliente(req.body);

        await cliente.save();
        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.obtenerClientes = async (req, res) => {
    try {
        const cliente = await Cliente.find();
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.actualizarCliente = async (req, res) => {
    try {
        const { cedula, nombre, direccion, telefono, correo } = req.body;
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            res.status(404).json({msg: 'El cliente no existe'});
        }

        cliente.cedula = cedula;
        cliente.nombre = nombre;
        cliente.direccion = direccion;
        cliente.telefono = telefono;
        cliente.correo = correo;

        cliente = await Cliente.updateOne({ _id: req.params.id }, cliente, { new: true });
        res.json(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.obtenerCliente = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            res.status(404).json({msg: 'El cliente no existe'});
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}

exports.eliminarCliente = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            res.status(404).json({msg: 'El cliente no existe'});
        }
        await Cliente.remove({ _id: req.params.id });
        res.json({msg: 'El cliente ha sido eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');
    }
}