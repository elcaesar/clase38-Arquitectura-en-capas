const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  codigo: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
  },
  precio: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
});

module.exports = model("Producto", ProductoSchema);
