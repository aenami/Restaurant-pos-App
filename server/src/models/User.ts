import { getConnection } from '../config/db.js'
import { compareHash } from '../services/passwordService.js';

interface typeUser {
    // Nuestra funcion devuelve una promesa, que cuando se resuelve devuelve un string o nada
    verifyUserExists: (email: string) => Promise<true | false>;
    verifyLoginUser: (email: string, password: string) => Promise<true | false>;
    getIdUser: (email: string) => Promise<dataUser>;
}

interface dataUser {
    id_usuario: number;
    nombre_usuario: string;
}

const User: typeUser = {
    async verifyUserExists(email) {
        // Funcion que verificara si existe un usuario con ese documento registrado
        try {
            const query = `SELECT id_usuario FROM USUARIO WHERE email_usuario = $1`

            const values = [email]

            const connection = getConnection()

            const result = await connection.query(query, values)
            // Verificamos si hubo coincidencias y la db devolvio algo
            if(result.rows.length > 0){
                return true
            }
            return false

        } catch (error) {
            console.log('Hubo un error al consultar el documento ingresado en la db')
            throw error
        }
    },

    async verifyLoginUser(email, password) {
        // Funcion que se encarga de verificar que la contraseña ingresada coincida con la que se tiene almacenada
        try {
            // Consulta a la db
            const query = `SELECT password_usuario FROM USUARIO WHERE email_usuario = $1`
            const values = [email]

            const connection = getConnection()
            const result = await connection.query(query, values)

            const isMatch = await compareHash(password, result.rows[0].password_usuario) 

            return isMatch
        } catch (error) {
            console.log('Error al verificar el documento / contraseña ingresado')
            throw error
        }
    },

    async getIdUser(email: string) {
        try {
            const query = `SELECT id_usuario, nombre_usuario FROM USUARIO WHERE email_usuario = $1`
            const values = [email]
            const connection = getConnection()
            const result = await connection.query(query,values)
            return result.rows[0] // retornamos el primer objeto
        } catch (error) {
            console.log('Error al obtener el id del paciente a partir de su documento')
            throw error
        }
    },

}

export default User