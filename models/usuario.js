const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = Schema({
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  avatar: {type: String, required: true},
  nombre:{type: String, required: true},
  direccion: {type: String, required: true},
  edad: {type: Number},
  telefono:{type: String, required: true},
  role: {type: String, enum: ['user', 'admin'], default: 'user'}
});

UsuarioSchema.methods.encryptPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UsuarioSchema.methods.comparePassword = function (passIngresado) {
  return bcrypt.compareSync(passIngresado, this.password);
}

module.exports = model("Usuario", UsuarioSchema);
