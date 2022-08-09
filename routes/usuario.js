const {Router} = require('express');
const {isAuthenticated} = require('../middlewares/auth')
const passport = require('passport')
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  profileGet,
} = require('../controllers/usuario');

const isAuth = require('../middlewares/auth');
const router = Router();

router.get('/signup', signupGet);

router.post('/signup', passport.authenticate('register', {
  failureRedirect : 'signup',
  passReqToCallback : true
}), signupPost);

router.get('/login', passport.authenticate('login', {
  failureRedirect : 'login',
  passReqToCallback : true
}));

router.post('/login', loginPost);

router.get('/profile', isAuthenticated, profileGet);

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;