const mongoose = require("mongoose");

const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONN, {
      useNewUrlParser    : true,
      useUnifiedTopology : true,
    });
    console.log("MongoDB Atlas conectado");
  } catch (error) {
    console.log(error);
    throw new Error("Error con la base de datos");
  }
};

module.exports = {
  mongoDbConnect,
};
