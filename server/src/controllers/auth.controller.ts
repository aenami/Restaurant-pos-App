// Importamos el modelo
import User from "../models/User.js"
import type { Request, Response} from 'express' // Importamos los tipos de datos para req/res
import { hashPassword } from "../services/passwordService.js" // Improtamos el servicio de password
import { generateToken } from "../services/tokenService.js"
import { parse } from "node:path"

export const loginUser = async (req: Request, res: Response) => {
    try {
        // Extraemos la informacion del formulario
        const {email, password} = req.body

        // Verificamos que el usuario exista en la db
        const userExists = await User.verifyUserExists(email)

        if(!userExists){
            return res.status(409).json({
                error: true,
                message: 'El email ingresado no esta registrado'
            })
        }

        // Verificar la informacion ingresada por el usuario
        const validateData = await User.verifyLoginUser(email, password)

        if(!validateData) {
            return res.status(409).json({
                error: true,
                message: 'Informacion ingresada incorrecta. Error en el email o contraseña'
            })
        }

        // Luego de validar que si se ingreso la contraseña corecta, hacemos una consulta que traera el id del usuario el cual incluiremos en el body de nuestro token. Tambien informacion extra
        const userData = await User.getIdUser(email)
        const token = generateToken(userData.id_usuario) // ----------------------------------------------

        //-------Devolvemos la respuesta correcta al frontend con el token y la informacion del user logeado
        return res.status(200).json({
            error: false,
            message: 'Login exitoso..',
            token: token,
            user: {
                id: userData.id_usuario,
                nombre: userData.nombre_usuario,
            }

        })

    } catch (error) {
        console.log('Error al logear el usuario', error)
        return res.status(500).json({
            error: true,
            message: error
        })
    }
}

