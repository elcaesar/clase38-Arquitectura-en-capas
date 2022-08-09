const { response } = require('express')
const Carrito  = require('../models/carrito');
const carrito = new Carrito();

const listProductosCarrito = async (req, res = response) => {
  const id = parseInt(req.params.id);
    const carritoList = await carrito.getById(id);
    if (carritoList !== null) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const createCarrito = async (req, res = response) => {
  const id = await carrito.save()
  res.status(201).json({msg : `Carrito creado con id:${id}`});
}

const addProductoCarrito = async (req, res = response) => {
  const id = parseInt(req.params.id);
    const productos = req.body;
    const carritoAdd = await carrito.getById(id);
    if (carritoAdd !== null) {
        await carrito.addProductsCart(productos, id);
        res.status(200).json({mensaje: `Productos agregados al carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const deleteCarrito = async (req, res = response) => {
  const id = parseInt(req.params.id);
    const carritoDelete = await carrito.getById(id);
    if (carritoDelete !== null) {
        await carrito.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el carrito ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

const deleteProductoCarrito = async(req, res = response) => {
  const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carritosDelete = await carrito.getById(id);
    if (carritosDelete !== null) {
        await carrito.deleteProductCart(id_prod, id);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

module.exports = {
  listProductosCarrito,
  createCarrito,
  addProductoCarrito,
  deleteCarrito,
  deleteProductoCarrito
}