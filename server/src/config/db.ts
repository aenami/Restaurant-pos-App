import { Pool } from "pg" // Importamos el modulo para trabajar Postgress
let pool: Pool; // Inicializamos la variable que contendra nuestro pool de conexiones

// Funcion que se ejecutara desde index.js al levantar el servidor
export const initializePool = async () => {
    // Creamos un pool para administrar las conexiones
    // Todavia no se ha realizado ninguna conexion directa a la bd
    pool = new Pool( {
        connectionString: process.env.DATABASE_URL // Informacion necesaria para conectarnos a la db
    } )
    
    // Verificamos la conexion a la bd conectandonos explicitamente a una conexion del pool
    try {
        const client = await pool.connect()
        console.log("Conexion realizada con exito")
        client.release(); // Soltamos la conexion
    } catch (error: unknown) { // Catch para atrapar errores
        if(error instanceof Error){
            // Terminamos el proceso y por ende el levantamiento del servidor
            console.error("Error al intentar crear una conexion: ", error.message)
            process.exit(1);
        }else{
            console.log("Ocurrio un error inesperado al crear el pool hacia la db")
        }
        
    }
    
};

export const getConnection = () => {
    if(!pool){
        throw new Error("El pool de conexiones no ha sido inicializado")
    }
    return pool
}