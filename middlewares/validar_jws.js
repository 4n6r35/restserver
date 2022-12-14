import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";



const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No se encuentra token en la petición'
        });
    }
    try {
        const { user_id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //Leer el usuario que corresponde al user_id
        const usuario = await Usuario.findById (user_id)///
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }


}

export default validarJWT;
