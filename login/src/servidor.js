const express=require('express');
const app=express();
const path=require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverrid = require('method-override');
const morgan = require('morgan');
const session=require('express-session');
const flash=require('connect-flash');
var cookieParser = require('cookie-parser');


//middleware
app.use(morgan('dev'));
app.use(methodOverrid('_method'));
app.set('port', process.env.PORT || 4000)
app.set('views',path.join(__dirname,'vistas'));
app.use(express.static(path.join(__dirname, 'publico')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

 
app.engine('.hbs', exphbs({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs'
})); 
app.set('view engine', '.hbs');
app.use(flash());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

 


//variables globales
app.use((req,res,next)=>{
    res.locals.mensaje_exito=req.flash('mensaje_exito');
    res.locals.mensaje_error=req.flash('mensaje_error'); 
    res.locals.usuario=req.flash('usuario'); 
    next();
});
//ruta
const rutaIndex=require('./rutas/indexRuta')
app.use('/', rutaIndex);
const rutaTarea=require('./rutas/tareaRuta')
app.use('/tarea', rutaTarea);
const usuarioRuta=require('./rutas/usuarioRuta')
app.use('/', usuarioRuta);
//base
require('./bd');
 


 
module.exports=app;