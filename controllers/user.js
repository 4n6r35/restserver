
import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import usuario from "../models/usuario.js";


const userGet = async (req = request, res = response) => {
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true }

    //RESPUESTA DE PROMESAS
    // const users = await usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await usuario.countDocuments(query);

    //RESOLVER PROMESAS DE MANERA SIMULTANEA
    const [total, users] = await Promise.all([
        usuario.countDocuments(query),
        usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        users
    });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    //TODO validar contra base de datos
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await usuario.findByIdAndUpdate(id, resto);
    res.json(userDB);
}

const userPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new usuario({ name, email, password, role });
    //Encriptar la contarseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await user.save();
    res.json({
        user
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;
    //Borrado fisicamente
    //const userD = await usuario.findByIdAndDelete(id)
    //Cambiando estado de la BD
    const userD = await usuario.findByIdAndUpdate(id, { status: false })
    res.json(userD);
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controllers'
    });
}
export {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}