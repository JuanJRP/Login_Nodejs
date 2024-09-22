//REQUERIMIENTOS QUE USAREMOS DE LAS PIP.
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//INICIALIZACIONES.
const app = express();
require('./db');
require('./passport/local-auth');

//CONFIGURACIONES.
app.use(express.static(__dirname + '/Source'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});

//RUTAS.
app.use('/', require('./routes/index'));

//INICIALIZACION DEL SERVIDOR.
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});