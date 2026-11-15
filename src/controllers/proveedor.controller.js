//5 funciones: listar, obtener, crear, actualizar, eliminar

const { pool } = require('../config/database')

const datos = ('razonsocial, contacto, ruc, direccion');

// req (require - solicitar >>>), res (result - <<< resultado)


//RESTIRCCIONES 

    const restricciones = async(req, res) =>{
        const errores = []

        if(razonsocial.trim() === '') errores.push('La razon social es obligatoria')
        if(contacto.trim() === '') errores.push('El contacto es obligatoria')
        if(ruc === undefined || !/^\d{11}$/.test(String(ruc))) errores.push('Deben ser 11 digitos ')
        if(direccion.trim() === '') errores.push('La dirección es obligatoria')
            
        return errores
    }

// LISTAR 
const listarProveedores = async (req, res) =>{
    try{
        const [listar] = await pool.query('SELECT *FROM proveedores ORDER BY id')
        res.status(200).json({
            ok:true,
            total: listar.length,
            data:listar,
            message: 'Mis datos'
        })
        
    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok: false,
            message: 'Error del servidor'
        })
    }
}

//OBTENER O BUSCAR

const buscarProveedores = async (req,res) =>{
    try{
        const id = Number(req.params.id)
        if(id<=0){
            return res.status(200).json({
                ok: false,
                message: 'El id no esta registrado'
            })
        }

        const [registroProveedor] = await pool.execute('SELECT *FROM proveedores WHERE id = ?', [id])

        if(registroProveedor.length === 0){
            return res.status(404).json({
                ok:false,
                message: 'No existe el proveedor'
            })
        }
        res.status(200).json({
            ok: true,
            data: registroProveedor[0]
        })
    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok:false,
            message: 'Error del servidor'
        })
    }
    
}

//CREAR PROVEEDOR xd

const crearProveedor = async(req, res) =>{
    try{
        //validar los datos 
        const errores = restricciones(req.body)
        if(errores.length>0){
            return res.status(400).json({
                ok: false,
                message: 'Verifique los datos',
                errores
            })
        }

        //ahora vamos a crear 
        const {razonsocial, contacto, ruc, dirreccion} = req.body
        const crearProveedor = 'INSERT INTO proveedores (razonsocial, contacto, ruc, dirreccion) VALUES (?,?,?,?)'
        const [registroProveedor] = await pool.execute(crearProveedor, [razonsocial, contacto, ruc, dirreccion])
        res.status(200).json({
            ok: true,
            id: registroProveedor.insertId,
            message: 'Creado correctamente un nuevo proveedor'
        })
    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok: false,
            message: 'Error del servidor'
        })
    }    

}

//ACTUALIZAR 
const actualizarProveedor = async (req, res) => {
    try{
        //obtenemos el ID para poder saber quien actualizar 
        const id = Number(pool.params.id)

        if(id<0){
            return res.status(200).json({
                ok: false,
                message: 'El ID no valido '
            })
        }

        //VALIDAMOS LOS DATOS 
        const errores = restricciones(req.body)

        if(errores.length > 0){
            return res.status(200).json({
                ok: false,
                message: 'Valide los datos',
                errores
            })
        }

        //SI EL ID NO EXITE
        const [existe] = await pool.execute('SELECT *FROM proveedores WHERE id=?', [id])
        
        if(existe.length === 0){
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }

        //AHORA SI VAMOS A ACTUALIZAR
        const actualizarProveedor = ('UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, dirreccion=? WHERE id=?')
        const {razonsocial, contacto, ruc, dirreccion} = req.body
        const [actualiza] = await pool.execute(actualizarProveedor, [razonsocial, contacto, ruc, dirreccion, id])
        
        res.status(200).json({
            ok: true,
            filaactualizada: actualiza.affectedRows,
            message: 'Se actualizo correctamente'
        })
    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok: false,
            message: 'Error del servidor'
        })
    }    

}

//ELIMINAR PROVEEDOR

const eliminarProveedor = async(req, res) =>{
    try{
        const id = Number(pool.params.id)
        const [eliminar] = await pool.execute('DELETE FROM proveedores WHERE id=?', [id])

        if(eliminar.affectedRows === 0){
            return res.status(404).json({
                ok: false,
                message: 'El ID no existe'
            })
        }
        res.status(200).json({
            ok:true,
            message: 'Eliminado correctamente'
        })
    }catch(e){
        console.error(e)
        return res.status(500).json({
            ok:false,
            message: 'Error del servidor'
        })
    }
}

//METODOS EXPORTADOS
module.exports = {
    listarProveedores,
    crearProveedor,
    buscarProveedores,
    actualizarProveedor,
    eliminarProveedor
}