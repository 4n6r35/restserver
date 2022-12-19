import { response } from "express";
import { Types } from 'mongoose'
const { ObjectId } = Types
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js"
import Producto from "../models/producto.js";


const Colcepermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const busqUsuarios = async (termino = '', res = response) => {
    const MongoIdvalido = ObjectId.isValid(termino); //TRUE
    if (MongoIdvalido) {
        const usuariobusq = await Usuario.findById(termino);
        return res.json({
            results: (usuariobusq) ? [usuariobusq] : []
        });
    }

    const regex = new RegExp(termino, 'i')
    const busqUsuariosn = await Usuario.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });
    return res.json({
        results: busqUsuariosn

    });
}

const busqCategorias = async (term = '', res = response) => {
    const MongoIdvalido = ObjectId.isValid(term)
    if (MongoIdvalido) {
        const categoriabusq = await Categoria.findById(term);
        return res.json({
            results: (categoriabusq) ? [categoriabusq] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const busqcategoria = await Categoria.find({ nombre: regex, status: true });
    res.json({
        results: busqcategoria
    });
}

const busqProducto = async (ter = '', res = response) => {
    const MongoIdvalido = ObjectId.isValid(ter)
    if (MongoIdvalido) {
        const productobusq = await Producto.findById(ter)
            .populate('categoria', 'nombre');
        return res.json({
            results: (productobusq) ? [productobusq] : []
        });
    }
    const regex = new RegExp(ter, 'i');
    const busqproducto = await Producto.find({ nombre: regex, status: true })
        .populate('categoria', 'nombre');
    res.json({
        results: busqproducto
    });
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params
    if (!Colcepermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${Colcepermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            busqUsuarios(termino, res);
            break;
        case 'categorias':
            busqCategorias(termino, res);
            break;
        case 'productos':
            busqProducto(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer búsqueda'
            });
    }
}


export { buscar }