const isAuth = {};

isAuth.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  //req.flash('loginMsg', 'No está autorizado');
  req.flash('loginMsg','Ingrese sus credenciales');
  res.redirect('/usuario/login');
}

module.exports = isAuth;