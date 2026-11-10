//contiene la logica de la palicacion

const {pool} = require('../config/database')

const campos = 'id, marca, descripcion, precio, stock'

// All functions will be ASYNCHRONOUS (they will take some time to be resolved...)
// milliseconds, seconds (1000 = 1sec)[cite: 1]
// All functions receive and send data (gateways)[cite: 1]
// req (require - request >>>), res (result - <<< result)[cite: 1]

const listarProducto = async(req, res) =>{
  //Se utiliza try - catch porque existe una probabilidad de error

  try{
    const [productos] = await pool.query('SELECT *FROM productos ORDER BY id')
    res.status(200).json({
      ok:true,
      total: productos.length,
      data: productos
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'error interno en el servidor'
    })
  }
}

const obtenerProducto = async(req, res) =>{
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'error interno en el servidor'
    })
  }
}

const crearProducto = async(req, res) =>{
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'error interno en el servidor'
    })
  }
}

const actualizarProducto = async(req, res) =>{
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'error interno en el servidor'
    })
  }
}

const eliminarProducto = async(req, res) =>{
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'error interno en el servidor'
    })
  }
}

// All methods must be EXPORTED (they will be used from the app)[cite: 2]
// the one that will use it is "routes"[cite: 2]
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