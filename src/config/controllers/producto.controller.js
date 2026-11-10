//contiene la logica de la palicacion

const {pool} = require('../config/database')

const campos = 'id, marca, descripcion, precio, stock'

// All functions will be ASYNCHRONOUS (they will take some time to be resolved...)
// milliseconds, seconds (1000 = 1sec)[cite: 1]
// All functions receive and send data (gateways)[cite: 1]
// req (require - request >>>), res (result - <<< result)[cite: 1]

const listarProducto = async(req, res) =>{}

const obtenerProducto = async(req, res) =>{}

const crearProducto = async(req, res) =>{}

const actualizarProducto = async(req, res) =>{}

const eliminarProducto = async(req, res) =>{}

modulo.exports = {
  listarProducto,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto

}

// BUSCAR

//LISTAR

//REGISTRAR

//ACTUALIZAR

//ELIMINAR