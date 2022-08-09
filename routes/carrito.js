const {Router} = require('express')
const {
  listProductosCarrito,
  createCarrito,
  addProductoCarrito,
  deleteCarrito,
  deleteProductoCarrito
} = require('../controllers/carrito')

const router = Router()

router.get('/:id/productos', listProductosCarrito)// lista todos los prod de un carrito pasado por id

router.post('/', createCarrito) // crea un carrito y devuelve su id

router.post('/:id/productos', addProductoCarrito) // agrega productos al carrito por su id de carrito

router.delete('/:id', deleteCarrito) //vacia un carrito y lo elimina

router.delete('/:id/productos/:id_prod', deleteProductoCarrito) // Elimina un producto de acuerdo a id de producto e id de carrito

module.exports = router