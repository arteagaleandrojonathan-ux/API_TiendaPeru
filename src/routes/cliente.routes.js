const { Router } = require("express"); //Manejador de rutas
const controller = require("../controllers/cliente.controller"); //Controlador (Lógica)

const router = Router(); //Considerar los verbo

router.get("/", controller.listarClientes);
router.get("/:id", controller.buscarClientes);
router.post("/", controller.crearClientes);
router.put('/:id', controller.actualizarClientes);
router.delete('/:id', controller.eliminarClientes);

module.exports = router;
