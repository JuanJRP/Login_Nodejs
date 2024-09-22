const mongoose = require('mongoose'); //UTILIZAMOS MONGOOSE PARA HACER LA CONEXION CON LA DB.
const { mongodb } = require('./keys'); //TRAEMOS LA URL DE CONEXION.

mongoose.connect(mongodb.URI, {}) //DEPENDIENDO DEL RESULTADO DE LA CONEXION NO LO INFORMARA POR TERMINAL.
    .then(db => console.log('Data Base is connected'))
    .catch(err => console.error(err));