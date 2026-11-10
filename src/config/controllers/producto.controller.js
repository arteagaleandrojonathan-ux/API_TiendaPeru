//Este archivo contiene la logica de la aplicacion
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO 1:
//const objeto = requiere() //Incorporando todos los metodos
//const { otroObjeto } = require('') //SOLO ALGUNAS FUNCIONES

const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //Dato comun

//Todas las funciones seran ASINCRONAS (es decir tradaran un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarela)

const listarProductos = async (req, res) => {
  //Se utiliza try - catch porque existe una probabilidad de error
  try{
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok:true,
      total: productos.length,
      data: productos
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor"
    })
  }
}

//Buscar ¿Como funciona?
//API REST => http://miaplicacion.com/api/productos/1
const ObetenerProductos = async (req, res) => {
  try{
    //req.params representa los parametros enviados por la URL
    const id = Number(req.params.id)
    if (id <= 0){
      return res.status(400).json({
        ok: false,
        message: "El ID no puede ser negativo o cero"
      })
    }

    //Si podemos buscar (>0). Utilizaremos excute porque pasaremos parámetros
    //Evitaremos  SQLinjection (tecnica hackeo)
    //? significa comodin, representa un valor 
    const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`, [id])

    //Existe la posibilidad que NO encontremos el registro
    if(registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }

    //Si llegamos hasta aqui, entonces Si existe el registro
    res.status(200).json({
      ok: true,
      data: registro[0] 
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor"
    })
  }
}

const crearProductos = async (req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor"
    })
  }
}

const actualizarProductos = async (req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor"
    })
  }
}

const eliminarProductos = async (req, res) => {
  try{

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor"
    })
  }
}

//Todos los metodos deben de ser EXPORTADOS (se utilizaran desde la app)
//el que lo optimizara sera "routes"
module.exports = {
  listarProductos,
  ObetenerProductos,
  crearProductos,
  actualizarProductos,
  eliminarProductos
}