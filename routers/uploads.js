import { Router } from "express"
import { check } from "express-validator";
import validarCampos from "../middlewares/validar_campos.js";
import { ActualizarArchivo, cargarArchivo } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db_validators.js";

const routerUploads = Router();

routerUploads.post('/', cargarArchivo)
routerUploads.put('/:coleccion/:id', [
    check('id', 'debe ser un Id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], ActualizarArchivo)

export default routerUploads;