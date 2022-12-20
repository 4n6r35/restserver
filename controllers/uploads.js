import path from "path"
import fs from "fs";
import { response } from "express";
import { subirArchivo } from "../helpers/index.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";


const cargarArchivo = async (req, res = response) => {
    try {
        //Imagenes_ txt,md
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json(msg)
    }

}


const ActualizarArchivo = async (req, res = response) => {
    try {
        const { id, coleccion } = req.params;
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No exite usuario con el Id: ${id}`
                    });
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No exite producto con el Id: ${id}`
                    });
                }
                break;
            default:
                return res.status(500).json({ msg: 'Olvide validar esto' });
        }

        // Limpiar imágenes previas
        if (modelo.img) {

            //Borrar la img del server
            const pathImagen = path.join(process.cwd(), './uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
        const nombrearch = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombrearch;

        await modelo.save();

        res.json(modelo);

    } catch (error) {
        res.status(400).json(error)
    }
}

const MostrarImg = async (req, res = response) => {
    try {
        const { id, coleccion } = req.params;
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No exite usuario con el Id: ${id}`
                    });
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No exite producto con el Id: ${id}`
                    });
                }
                break;
            default:
                return res.status(500).json({ msg: 'Olvide validar esto' });
        }

        // Limpiar imágenes previas
        if (modelo.img) {

            //Borrar la img del server
            const pathImagen = path.join(process.cwd(), './uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }
        const pathImagen = path.join(process.cwd(), './assets/image-not-found.png')
        res.sendFile(pathImagen);


    } catch (error) {
        res.status(400).json(error)
    }


}

export {
    cargarArchivo,
    ActualizarArchivo,
    MostrarImg
}