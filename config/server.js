require('dotenv').config();
const express = require('express');
const userSession = require('express-session')
const morgan = require('morgan');
const flash = require('connect-flash');

const path = require('path');
const fileUpload = require('express-fileupload')
const passport = require('passport')
const { initializePassport } = require('../middlewares/passport/auth.local');
const { mongoDbConnect } = require('./mongoDbConnect')
const { create } = require('express-handlebars');
const productosRoute = require('../routes/productos');
const carritoRoute = require('../routes/carrito');
const usuarioRoute = require('../routes/usuario');
const dashboardRoute = require('../routes/dashboard');

class Server {
  constructor(){
    this.app  = express()
    this.port = process.env.APP_PORT || 8080
    this.path = {
      productos   : '/producto',
      carrito     : '/carrito',
      usuario     : '/usuario',
      dashboard   : '/'
    }
    this.hbs = create({
      defaultLayout : 'main',
      layoutsDir    : path.join(this.app.get('views'), 'layouts'),
      partialsDir   : path.join(this.app.get('views'), 'partials'),
      extname       : 'hbs'
    })

    //db connect
    this.connectDb()

    //Middlewares
    this.middlewares()

    // Rutas de la app
    this.routes()
  }

  async connectDb(){
    await mongoDbConnect()
  }
   
  middlewares(){
    //conjunto de middleware a usar en la aplicacion
    
    //modulo para subir archivos
    this.app.use(fileUpload())

    this.app.use(morgan('dev'))
    //passport
    this.app.use(userSession({
      secret : 's3cr3t',
      resave : false,
      saveUninitialized : false
    }));
    initializePassport();
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash());

    //flash messages
    this.app.use( (req, res, next) => {
      this.app.locals.loginMsg = req.flash('loginMsg');
      this.app.locals.registerMsg = req.flash('registerMsg'); 
      this.app.locals.shopMsg = req.flash('shopMsg'); 
      next();
    })

    // directorio publico
    this.app.use(express.static(path.join(__dirname,'../public')))
    
    // Lectura y parseo del body a JSON cuando se usa POST, PUT, DELETE por ej.
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended : true}))
  
    //template engine handlebars
    this.app.engine('.hbs', this.hbs.engine)
    this.app.set('view engine', '.hbs')
    this.app.set('views', path.join(__dirname, '../views'))
  }

  routes(){
    this.app.use(this.path.carrito , carritoRoute)
    this.app.use(this.path.productos , productosRoute)
    this.app.use(this.path.usuario , usuarioRoute)
    this.app.use(this.path.dashboard , dashboardRoute)

    //consulta de prueba a la db de firestore 
    // this.app.get('/fire' , async (req,res) =>{
    //   const result = await dbFirestore.collection('productos').get()
    //   console.log(result.docs[0].data());
    // })
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server Up on port ${this.port}`)
    })
  }
  
}

module.exports = Server