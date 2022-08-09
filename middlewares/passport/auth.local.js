const passport = require("passport");
const local = require("passport-local") 
const Usuario = require("../../models/usuario"); 
const { createHash, isValidPassword } = require("../../helpers/password") ;

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { 
                usernameField: 'userEmail',
                passwordField: 'userPass',
                passReqToCallback: true 
            },
            async (req, userEmail, userPass, done) => {
                try {
                    let user = await Usuario.findOne({ email: userEmail })
                    if (user) return done(null, false, {message : 'Ya existe un usuario con ese Email. Intente de nuevo'})
                    const newUser = {
                        email: userEmail,
                        password : createHash(userPass),
                        avatar: req.files.userAvatar.name,
                        nombre: req.body.nameUser,
                        direccion: req.body.addressUser,
                        edad: req.body.ageUser,
                        telefono: req.body.phoneUser
                    }

                    try {
                        let result = await Usuario.create(newUser);
                        return done(null, result);
                    } catch (error1) {
                        // req.app.get('logger').error(error);
                        // done(error);
                       done(error1);
                    }
                } catch(err) {
                    // done(err);
                    // req.app.get('logger').error(error);
                    done(err);
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'userEmail',
            passwordField: 'userPass',
        },
            async (userEmail,userPass,done) => {
                 try {
                    let user = await Usuario.findOne({ email : userEmail});
                    if( (!user) || (!isValidPassword(user,userPass)) ) return done(null, false,req.flash('loginMsg', 'Hay un error en sus credenciales, intente de nuevo.'))

                    // if (!user) return done(null, false,req.flash('loginMsg', 'Hay un error en sus credenciales, intente de nuevo.'))
                    // if (!isValidPassword(user,userPass)) return done(null, false,{message:'Hay un error en sus credenciales, intente de nuevo.'})

                    return done(null, user)
                } catch (error) {
                    done(error);
                }
            }
        )
    )
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser((id,done) => {
        Usuario.findById(id, done);
    })
}

module.exports = {
    initializePassport
}
