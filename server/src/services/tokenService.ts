import jwt from "jsonwebtoken"

export const generateToken = (id_usuario: number) => {
    // Payload con la informacion del usuario que almacenara el tokken
    const payload = {
        id: id_usuario,
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET!, // Le dicemos a typescript que confie que esto nunca sera nulo
        { expiresIn: '8h' }
    )
    return token
}