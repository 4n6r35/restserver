
import { response, request } from "express";

const userGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controllers',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - controllers',
        id
    });
}

const userPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - controllers',
        nombre,
        edad
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controllers'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controllers'
    })
}
export {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}