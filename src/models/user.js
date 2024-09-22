const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose; //UTILIZAMOS MONGOOSE PARA CREAR UN ESQUEMA.

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}); //EN EL ESQUEMA DEFINIMOS LO QUE VAMOS A ENVIAR A LA BASE DE DATOS.

userSchema.methods.encryptPassword = (password) => { //UTILIZAMOS UN METODO PARA ENCRIPTAR LA CONTRASEÑA.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //LOS HASH NOS AYUDAN A ENCRIPTAR ENTRE MAS VECES MEJOR.
};

userSchema.methods.comparePassword = function(password) { //CREAMOS UN METODO PARA COMPARAR LAS CONTRASEÑAS.
    return bcrypt.compareSync(password, this.password); //HACEMOS UNA COMPRACION Y RETORNAMOS.
};

module.exports = mongoose.model('user', userSchema); //EXPORTAMOS EL MODULO PARA PODER USARLO EN EL PROYECTO.