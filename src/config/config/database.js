const mysql = require('mysql2/promise') //AACEDIENDO modulo conexion
const { db } = require('./env') //leer y validar los parametros de conexion

//este archivo gestiona la conexion al SERVER y a la BD 
const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  waitForConnections: true,
  connectionLimit: db.connectionLimit,
  queueLimit: 0
})

//verificar conexion
const probarConexion = async() => {
  const conexion = await pool.getConnection()
  conexion.release


}

//exproral la conexion
module.exports = { pool, probarConexion}
