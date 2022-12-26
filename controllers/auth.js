
import { request, response } from "express"
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import generarJWT from "../helpers/generar_jwt.js";
import google_verify from "../helpers/google_verify.js";

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        //Verificar si email existe
        const userpse = await Usuario.findOne({ email });
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

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const { email, name, img } = await google_verify(id_token);
        let usuario_google = await Usuario.findOne({ email });
        if (!usuario_google) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };
            usuario_google = new Usuario(data);
            await usuario_google.save();
        }
        if (!usuario_google.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        const token = await generarJWT(Usuario.id);
        res.json({
            usuario_google, token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'token no válido'
        })
    }

}

const renovarToken = async (req, res = response) => {
    const { usuario } = req;
    //Generar el JWT
    const token = await generarJWT(usuario.id);
    res.json({
        usuario,
        token
    });
}


export {
    login,
    googleSignIn,
    renovarToken
}