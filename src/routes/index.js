const express = require('express'); //TRAEMOS EL API DE EXPRESS QUE NOS AYUDARA CON LA DIRECCIONES.
const router = express.Router(); //UTILIZAMOS UNA EXTENCION DE EXPRESS PARA REDIRECCIONAR DEPENDIENDO DE LA ACCION.
const passport = require('passport'); //PASSPORT NOS AYUDA CON LA VERIFICACION DE CONTRASEÑAS.

router.get('/', (req, res, next) => {
    res.render('signin'); //CUANDO ENTREMOS A LA DIRECCION PRINCIPAL "/" NOS CARGARA EL SIGNIN.EJS QUE ES NUESTRO LOGIN.
});

router.post('/signin', passport.authenticate('local-signin', { //AUTENTICAMOS LOS DATOS.
    successRedirect: 'http://www.automaticaycontrol.com/', //SI LA AUTENCTICACION ES CORRECTA NOS REDIRECCIONA A LA PAGINA DESEADA.
    failureRedirect: '/', //EN CASO DE FALLAR NOS CARGA DENUEVO EL SIGNIN.
    passReqToCallback: true //ESPERAMOS EL CALLBACK.
}));

router.get('/signup', (req, res, next) => {
    res.render('signup'); //CUANDO ENTREMOS A LA DIRECCION "/SIGNUP" NOS CARGA EL SIGNUP.EJS QUE ES NUESTRO REGISTRO.
});

router.post('/signup', passport.authenticate('local-signup', { //VERIFICAMOS LOS DATOS DEL SIGNUP Y LOS ENVIAMOS A LA DB.
    successRedirect: '/', //SI ES CORRECTO NOS CARGA EL LOGIN "/" QUE SERIA NUESTRO SIGNIN.EJS.
    failureRedirect: '/signup', //EN CCASO DE FALLAR NO CARGA DENUEVO EL REGISTER "/SIGNUP" QUE ES EL SIGNUP.EJS.
    passReqToCallback: true //ESPERAMOS EL CALLBACK.
}));

module.exports = router; //EXPORTAMOS LAS RUTAS PARA QUE PODAMOS USARLAS EN EL RESTO DE PROYECTOS.