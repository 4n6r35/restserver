import { response } from "express";
import Producto from '../models/producto.js';

//Obtenerctg_paginado
const Obtenerprod_pag = async (req, res = response) => {
    try {

        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true }
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.json({
            total,
            productos
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

}
//Obtenerctg

const Obtenerprod = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}

const Crearprod = async (req, res = response) => {

    try {
        const { status, user, ...body } = req.body;
        const productoDB = await Producto.findOne({ nombre: body.nombre });
        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre}, ya existe`
            });
        }
        //Generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }
        const producto_data = new Producto(data);
        // Guardar DB
        await producto_data.save();
        res.status(201).json(producto_data);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

//Actualizarctg
const Actualizarprod = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { status, usuario, ...data } = req.body;
        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase();
        }
        data.usuario = req.usuario._id;
        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
        res.json(producto);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
//Deletectg
const Deleteprod = async (req, res = response) => {
    try {
        const { id } = req.params;
        const prodDelete = await Producto.findByIdAndUpdate(id, { status: false }, { new: true });
        res.json(prodDelete)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

export {
    Crearprod,
    Obtenerprod_pag,
    Obtenerprod,
    Actualizarprod,
    Deleteprod
}