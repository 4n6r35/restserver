
import { response } from "express"
import usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import generarJWT from "../helpers/generar_jwt.js";

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        //Verificar si email existe
        const userpse = await usuario.findOne({ email });
        if (!userpse) {
            return res.status(400).json({
                msg: 'Usuario|Password no son correctos/correo'
            });
        }
        //Si el usuario está activo
        if (!userpse.status) {
            return res.status(400).json({
                msg: 'Usuario no encontrado/status_false'
            });
        }
        //Verificar la contraseña
        const validpassword = bcryptjs.compareSync(password, userpse.password)
        if (!validpassword) {
            return res.status(400).json({
                msg: 'Usuario|Password no son correctos/password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(userpse.id);
        res.json({
            userpse,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ha ocurrido un error'
        });
    }

}


export {
    login
}