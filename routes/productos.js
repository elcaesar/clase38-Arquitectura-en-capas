const { Router } = require('express')
const { productosGet,
        productosPost,
        productosPut,
        productosDelete 
      } = require('../controllers/productos')

const router = Router()

router.get('/:id?', productosGet) //si GET solo define '/' es listar todos los prod; si trae '/:id' se lista el prod con id consultado (para user y admin)

router.post('/', productosPost) // incorporar productos al listado (solo para admin)

router.put('/:id', productosPut) // actualiza un producto por su id (solo para admin)

router.delete('/:id', productosDelete) // borra un prod por su id (solo para admin)


module.exports = router