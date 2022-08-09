const { response } = require('express')
const Producto = require('../models/producto')
const producto = new Producto()

const productosGet = async (req, res) =>  {
  //si se pasa parametro id entonces se lista info del producto
  const id = req.params.id || null
  console.log('el id es: ',id)
  if (id !== null){
      const productoList = await producto.getById(parseInt(id));
      if (productoList !== null){
          res.status(200).json(productoList);
      } else {
          res.status(400).json({error:'producto no encontrado'});
      }
  } else {
    // si no se pasa parametro entonces se lista todos los productos
      const productos = await producto.getAll();  
      res.status(200).json(productos);
  }
}

const productosPost = async(req, res) => {
  const productos = req.body;
  await producto.addProducts(productos);
  res.status(201).json({mensaje: `Productos agregados`});
}

const productosPut = async (req, res) => {
  const id = parseInt(req.params.id);
  const productoUpdate = await producto.getById(id);

  if (productoUpdate !== null) {
      await producto.updateById(id, req.body);
      res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
  } else {
      res.status(400).json({error:'producto no encontrado'});
  }
}

const productosDelete = async (req, res) => {
  const id = parseInt(req.params.id);
  const productoDelete = await producto.getById(id);
  if (productoDelete !== null) {
      await producto.deleteById(id)
      res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
  } else {
      res.status(400).json({error:'producto no encontrado'});
  }
}

module.exports = {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
}