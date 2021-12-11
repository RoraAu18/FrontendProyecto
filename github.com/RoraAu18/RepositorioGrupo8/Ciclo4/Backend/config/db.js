//conexion a la base de datos tiendaLaGenerica
const mongoose = require('mongoose');
require ('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB tiendaLaGenerica conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);//se detiene la app en caso de error
    }
}
module.exports = conectarDB
