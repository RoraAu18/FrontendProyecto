//enrutado al login, ojo que tiene el nombre index pero es el que se usa en el login
const { Router } = require('express');//instanciar el enrutador
const router = Router();//modelo de la ruta
const User = require('../models/User'); //importamos el modelo de usuario
const jwt = require('jsonwebtoken'); //importamos el modelo jsonwebtoken

router.get('/', (req, res) => { res.send('Mi puerto 3000 funciona!') });//aqui valido el listen en el puerto 3000

//aqui vamos a hacer el registro.
router.post('/signup', async (req, res) => {
    //aqui extraigo el usuario y la contraseña que digiten en el login
    const { usuario, password } = req.body;
    //aqui creo un nuevo usuario
    const newUser = new User({ usuario, password });
    //aqui guardo el usuario en la base de datos
    await newUser.save();
    //aqui genero el token
    const token = jwt.sign({_id: newUser._id }, 'llaveSecreta');
    //aqui envio el token al usuario
    res.status(200).json({ token });
})
//aqui vamos a dar la opcion de loguearse.
router.post('/signin', async (req, res) => {
    //aqui extraigo el usuario y la contraseña que digiten en el login para validarlo
    const { usuario, password } = req.body;
    //metodo para cotejar los valores guardados en la coleccion user, por correo
    const user = await User.findOne({ usuario })
    //aqui valido que el usuario exista
    if (!user) return res.status(401).send('El usuario no existe');
    //aqui valido que la contraseña sea correcta ya que el usuario existe
    if (user.password !== password) return res.status(401).send('La contraseña no es correcta');
    //aqui genero el token
    const token = jwt.sign({_id: user._id }, 'llaveSecreta');
    //aqui envio el token al usuario
    res.status(200).json({ token });
    });
//prueba de que funciona datos publicos
    router.get('/tasks', async (req, res) => {
        res.json([
            {
            _id:1,
            name: 'realizar venta',
            description: 'venta de un producto',
            date: '2021-11-15'
            },
            {
                _id:2,
                name: 'listado de clientes',
                description: 'revisar el listado de clientes',
                date: '2021-11-15'
                },
                {
                    _id:3,
                    name: 'consultar modulo venta',
                    description: 'informes',
                    date: '2021-11-15'
                    }
        ])
    });

    //prueba de que funciona datos privados
    router.get('/private-tasks', verifyToken, async (req, res) => {
        res.json([
            {
            _id:1,
            name: 'Listado Clientes',
            description: 'consultar cliente',
            date: '2021-11-15'
            },
            {
                _id:2,
                name: 'totalizar ventas',
                description: 'consolidado',
                date: '2021-11-15'
                },
                {
                    _id:3,
                    name: 'tarea acceso privado',
                    description: 'seguridad',
                    date: '2021-11-15'
                    }
        ])
    });

module.exports = router;

//verificacion de permisos de usuarios
function verifyToken (req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('NO esta autorizado para realizar esta accion.');
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('NO esta autorizado para realizar esta accion.');
    }
    // aqui guardo el contenido de los token asignados a los usuarios
    const payload = jwt.verify(token, 'llaveSecreta')
    req.userId = payload._Id
    next();
};