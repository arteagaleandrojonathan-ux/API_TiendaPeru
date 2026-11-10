// Needs app to have managed all the configuration[cite: 3]
const app = require('./app')
const { port } = require('./config/env')
const { probarConexion } = require('./config/database')

const iniciarServidor = async() => {
  try{
    await probarConexion()
    console.log('MySQL connection successful')

    // We start the services
    app.listen(port, () => {
      console.log(`servidor iniciado en http://localhost:${port}`)
    })
  }catch(e){
    console.error('We cannot connect to MySQL', e.message)
    process.exit(1)
  }
}

iniciarServidor()