const { Router } = require("express"); //Manejador de rutas
const controller = require("../controllers/proveedor.controller"); //Controlador (Lógica)

const router = Router(); //Considerar los verbo

router.get('/', controller.listarProveedores);
router.get('/:id', controller.buscarProveedores);
router.post('/', controller.crearProveedor);
router.put('/:id', controller.actualizarProveedor);
router.delete('/:id', controller.eliminarProveedor);


module.exports = router;
