//5 funciones: listar, obtener, crear, actualizar, eliminar

const { pool } = require('../config/database')
const atributos = ('id, nombres, apellidos, telefono, direccion, email')

// req (require - solicitar >>>), res (result - <<< resultado)

//RESTRICCIONES
const validarCampos = ({nombres, apellidos, telefono, direccion, email} = {}) => {
  const errores = []

  if (nombres.trim() === '') errores.push('El nombre es obligatorio')
  if (apellidos.trim() === '') errores.push('El nombre es necesario')
  if (telefono === '' || telefono.length > 9) errores.push('Verifique el número')
  if (direccion.trim() === '' ) errores.push('Ingrese la direccion')
  if (email.trim() === '') errores.push('Ingrese el email')

  return errores;
}


//listar
const listarClientes = async(req, res) =>{
    try{
        const [listarfila] = await pool.query("SELECT * FROM clientes ORDER BY id");
        res.status(200).json({
            ok : true,
            total: listarfila.length,
            data: listarfila
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }

}



//obtener o buscar, es lo mismo

const buscarClientes = async(req, res) => {
    try{
        const id = Number(req.params.id);
        if(id<=0){
            return res.status(400).json({
                ok: false,
                message:'El ID no se encontro'
            })
        }
        
        const [registroCliente] = await pool.execute(`SELECT * FROM clientes WHERE id = ?`,[id])
        // existe la posibilidad que no encontremos el registro
        if(registroCliente.length === 0){
            return res.status(404).json({
                ok : false,
                message: 'no existe el cliente'
            })
        }

        //si llegamos hasta aqui si existe el registro 
        res.status(200).json({
            ok: true,
            data: registroCliente[0]
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno en el servidor'
        })
    }
}



//crear
const crearClientes = async(req, res) =>{
    try {
        const errorCreacion = validarCampos(req.body)
        if(errorCreacion.length>0){
            return res.status(400).json({
                ok: false,
                message: 'Valide los datos',
                errorCreacion
            })
        }
        //procedamos a guardar los datos
        const {nombres, apellidos, telefono, direccion, email} = req.body;
        const  consulta = `INSERT INTO clientes (nombres, apellidos, telefono, direccion, email) 
                    VALUES (?,?,?,?,?)`
        const [registroCliente] = await pool.execute(consulta, [nombres, apellidos, telefono, direccion, email])

        res.status(201).json({
            ok: true,
            id: registroCliente.insertId
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            ok: false,
            message: 'Error interno del servidor'
        })
    }

}


//actualizar
const actualizarClientes = async (req, res) =>{

    try{
        const id = Number(req.params.id)

        //  Decimos que el ID no puede ser negativo
        if(id<=0){
            return res.status(400).json({
                ok: false,
                message: 'ID no encontrado, no se puede acualizar un ID no encontrado'
            })
        }


        // si el id no existe 
        const [existe] =  await pool.execute('SELECT *FROM clientes  WHERE id = ? ', [id])

        if(existe.length === 0){
            return res.status(404).json({
                ok: false,
                message: 'el id no existe'
            })
        }   


        //asegurar que los datos esten bien ingresados gracias a validarCampos
        const errores = validarCampos(req.body)
        if(errores.length>0){
            return res.status(400).json({
                ok: false,
                message: 'Verifique bien los datos',
                errores
            })
        }

        //por fin actualizamos

        const actualizar = ('UPDATE clientes SET nombres=?, apellidos=?,telefono=?, direccion=?, email=? WHERE id=?')
        const {nombres, apellidos, telefono, direccion, email} = req.body
        const [actualiza] = await pool.execute(actualizar,  [nombres, apellidos, telefono, direccion, email,id])

        res.status(200).json({
            ok: true,
            filaactualizada: actualiza.affectedRows,
            message: 'Actualizado correctamente'
        })

    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok:false,
            message: 'Error del servidor'
        })
    }


}


//eliminar
const eliminarClientes = async (req, res) =>{

    try{     
        const id = Number(req.params.id)

        //ELIMINAR 
        const [eliminar] = await pool.execute('DELETE FROM clientes WHERE id=?', [id])

        if(eliminar.affectedRows === 0){
            return res.status(400).json({
                ok: false,
                message: 'ID no existe'
            })
        }
        res.status(200).json({
            ok:true,
            message: 'eliminado correctamente',
        })

    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok:false,
            message: 'Error del servidor'
        })
    }
}

module.exports = {
  listarClientes,
  buscarClientes,
  crearClientes,
  actualizarClientes,
  eliminarClientes
}