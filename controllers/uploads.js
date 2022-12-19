import { response } from "express";
import { subirArchivo } from "../helpers/index.js";


const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivo para subir');
        return;
    }
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
    const { id, coleccion } = req.params;
    res.json({ id, coleccion })

}

export {
    cargarArchivo,
    ActualizarArchivo
}