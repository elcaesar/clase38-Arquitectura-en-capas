const { Schema, model } = require("mongoose");

const CarritoSchema = Schema({
  timestamp: {
    type: Date,
  },
  productos: [
    {
      id: {
        type: String,
      },
      cantidad: {
        type: Number,
      },
    },
  ],
});

module.exports = model("Carrito", CarritoSchema);