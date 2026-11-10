const{Router} = require('express');

const controller = require('../controllers/producto.controller');

const router = Router();

router.get('/', controller.listarProducto);
router.get('/:id', controller.obtenerProducto)

module.exports = router