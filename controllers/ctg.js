import { response } from "express";
import Categoria from '../models/categoria.js';

//Obtenerctg_paginado
const Obtenerctg_pag = async (req, res = response) => {
    try {

        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true }
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.json({
            total,
            categorias
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

}
//Obtenerctg

const Obtenerctg = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}

const Crearctg = async (req, res = response) => {

    try {
        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categoria.findOne({ nombre });


        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`
            });
        }
        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);

        // Guardar DB
        await categoria.save();

        res.status(201).json(categoria);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

//Actualizarctg
const Actualizarctg = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { status, usuario, ...data } = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;
        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
        res.json(categoria);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
//Deletectg
const Deletectg = async (req, res = response) => {
    try {
        const { id } = req.params;
        const ctgDelete = await Categoria.findByIdAndUpdate(id, { status: false }, { new: true });
        res.json(ctgDelete)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

export {
    Crearctg,
    Obtenerctg_pag,
    Obtenerctg,
    Actualizarctg,
    Deletectg
}