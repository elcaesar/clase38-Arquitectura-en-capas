const passport = require('passport')

const signupGet = (req, res, next) => {
  res.render('users/signup');
}

const signupPost = (req, res) => {
  //ya se valida el user y se guarda en /public su avatar
  let avatarFile = req.files.userAvatar;
  avatarFile.mv('public/images/avatar/'+ avatarFile.name);
  console.log(req.body)

  res.render('users/profile', {user : req.body, avatar: avatarFile.name, message : 'Se ha registrado exitosamente.'})

  // res.status(200).json({
  //   message:'Usuario registrado',
  //   userId: req.user.id,
  //   registered: true
  // })
}
  
const loginGet = (req, res, next) => {
  res.render('users/login');
}
const loginPost = (req, res, next) => {
  res.render('users/profile', {user : req.body , message : 'Ingresó exitosamente.'})
}
const profileGet = (req, res, next) => {
  res.render('users/profile');
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  profileGet
}