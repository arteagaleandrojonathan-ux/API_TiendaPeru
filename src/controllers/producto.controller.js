//Este archivo contiene la lógica de la aplicación
//5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO 1
//const objeto = require('') //TODOS LAS FUNCIONES
//const { otroObjeto } = require('') //SOLO ALGUNAS FUNCIONES

const { pool } = require('../config/database')
const CAMPOS = ('id, marca, descripcion, precio, stock') //Dato común

//Todas las funciones serán ASÍNCRONAS (tardarán un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envian datos (pasarelas)
// req (require - solicitar >>>), res (result - <<< resultado)

// crear - actualizar
const validarCampos = ({marca, descripcion, precio, stock} = {}) => {
  const errores = []

  if (marca.trim() === '') errores.push('La marca es obligatoria')
  if (descripcion.trim() === '') errores.push('La descripción es necesaria')
  if (precio === undefined || isNaN(precio) || precio < 0) errores.push('Verifique el precio')
  if (stock === undefined || !Number.isInteger(stock) || Number(stock) < 0) errores.push('Error en el stock')

  return errores
}


const listarProductos = async(req, res) => {
  //se utiliza try - catch por que existe una probabilidad de error 
  try{
  const [productos]= await pool.query('SELECT * FROM productos ORDER BY id')
  res.status(200).json({
    ok: true,
    total: productos.length,
    data: productos
  })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}
//buscar  ¿como funciona?
//API REST => http://miaplicacion.com/api/productos/1
const obtenerProducto = async(req, res) => {
  try{
    const id = Number(req.params.id)
    if (id <= 0){
      return res.status(400).json({
        ok : false,
        message: 'El ID no puede ser negativo o cero'
      })
    }

  // si podemos buscar (>0) utilizaremos execute por que pasaremos parametros 
  //evitaremos sqlinjection (tecnica de hackeo)
  //? = comodin , representa un valor
  const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`,[id])
  // existe la posibilidad que no encontremos el registro
  if(registro.length === 0){
    return res.status(404).json({
        ok : false,
        message: 'no existe el producto'
    })
  }

  //si llegamos hasta aqui si existe el registro 
  res.status(200).json({
    ok: true,
    data: registro[0]
  })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const crearProducto = async(req, res) => {
  try{
    const errores = validarCampos(req.body)
    if(errores.length >0){
      return res.status(400).json({
        ok: false,
        message: "verifique los datos solicitados",
        errores
      })
    }

    //procedemos a guardar  los datos
    const {marca, descripcion, precio, stock} = req.body
    const consulta = `INSERT INTO productos (marca, descripcion, precio, stock) values (?,?,?,?)`
    const [registro] = await pool.execute(consulta, [marca, descripcion, precio, stock])
    
    res.status(201).json({
      ok: true,
      id: registro.insertId
    })

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const actualizarProducto = async(req, res) => {
  try{

    // Obtener el ID del producto a actualizar (obtener...
    const id = Number(req.params.id)

    if (id < 0) {
      return res.status(400).json({
        ok: false,
        message: 'El ID no puede ser negativo'
      })
    }

    // Validar los campos (crearProducto)
    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    //Y SI EL ID NO EXISTE?
    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])

    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    //Finalmente actualizaremos
    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const {marca, descripcion, precio, stock} = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])  


    res.status(200).joson({
      ok: true,
      filasAfectadas: resultado.affectedRows

    })


  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const eliminarProducto = async(req, res) => {
  try{
    
    const id = Number(req.params.id)
    //agregar valicion ID no puede ser negativo

    const [resultado] = await pool.execute('DELETE FROM productos WHERE id= ?', [id])
    if(resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }
    res.status(200).json({
      ok:true,
      message: 'Producto Eliminado'
    })

  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

//Todos los métodos deben ser EXPORTADOS (se utilizarán desde la app)
//el que lo utilizaré será "routes"
module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}