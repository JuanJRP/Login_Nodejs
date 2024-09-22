const passport = require('passport');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
}); //CREAMOS UN SISTEMA DE SERIALIZACION QUE BUSCA POR ID DEL USUARIO(EMAIL).

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user); //CREAMOS UN SISTEMA PARA DESERIALIZAR EL EMAIL DE FORMA ASINCRONICA.
});

passport.use('local-signup', new LocalStrategy({ //DEFINIMOS LOS PARAMETROS QUE ENVIAREMOS A LA DB CON PASSPORT.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => { //UTILIZAMOS UNA FUNCION ASINCRONICA.
    const user = await User.findOne({ email: email }); //TRAEMOS EL EMAIL Y VERIFICAMOS QUE NO EXISTA YA UNO.
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe.')); //SI RETORNA UN TRUE ENTONCES DEPLEGAMOS UN MESAJE.
    } else {
        const newUser = new User();
        newUser.email = email; //GUARDAMOS EL EMAIL INGRESADO.
        newUser.password = newUser.encryptPassword(password); // UTILIZAMOS UNA INCRIPTACION DE CONTRASEÑA DE LOS MODELOS.
        console.log(newUser) // NOS MUESTRA EL USUARIO EN LA CONSOLA.
        await newUser.save(); //HACEMOS EL GUARDADO Y ESPERA LA CONFIRMACION DE LA DB.
        done(null, newUser); //NOS RETORNA EL EMAIL.
    }
}));

passport.use('local-signin', new LocalStrategy({ //DEFINIMOS LOS PARAMETROS QUE ENVIAREMOS A LA DB CON PASSPORT.
    usernameField: 'user',
    passwordField: 'passwd',
    passReqToCallback: true
}, async(req, email, password, done) => { //UTILIZAMOS UNA FUNCION ASINCRONICA.
    const user = await User.findOne({ email: email }); //TRAEMOS EL EMAIL Y VERIFICAMOS QUE SI EXISTA.
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No se encontro el usuario.')); //SI NO EXISTE ENTONCE DESPLEGAMOS UN MENSAJE DE ERROR.
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta.')); //SI EXISTE PER LA CONTRASEÑA ESTA MAL DESPLEGAMOS UN MENSAJE DE ERROR.
    }
    return done(null, user); //RETORNAMOS EL USUARIO.
}));