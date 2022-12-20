import { response } from "express";


const validarArchivosSubir = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivo para subir _ Validar_archivo_subir'
        });
    }

    next();
}

export default validarArchivosSubir