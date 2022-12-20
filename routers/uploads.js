import { Router } from "express"
import { check } from "express-validator";
import validarCampos from "../middlewares/validar_campos.js";
import validarArchivosSubir from "../middlewares/validar_archivos.js";
import { ActualizarArchivo, MostrarImg, cargarArchivo } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db_validators.js";

const routerUploads = Router();

routerUploads.post('/', validarArchivosSubir, cargarArchivo);
routerUploads.put('/:coleccion/:id', [
    validarArchivosSubir,
    check('id', 'debe ser un Id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], ActualizarArchivo);

routerUploads.get('/:coleccion/:id', [
    check('id', 'debe ser un Id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], MostrarImg)

export default routerUploads;