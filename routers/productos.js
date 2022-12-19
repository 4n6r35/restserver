import { Router } from "express";
import { check } from "express-validator";
import {
    Actualizarprod,
    Crearprod,
    Deleteprod,
    Obtenerprod,
    Obtenerprod_pag
} from "../controllers/prod.js";
import { existectg_byId, existeprod_byId } from "../helpers/db_validators.js";
import validarCampos from "../middlewares/validar_campos.js";
import validarJWT from "../middlewares/validar_jws.js";
import { Role_admin } from "../middlewares/validar_roles.js";

const routerprod = Router();
/**
 * {{url}} de la api/categorias
 */

//Obtener todas las categorias
routerprod.get('/', Obtenerprod_pag);
//Obtener por categoria/id_publico
routerprod.get('/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existeprod_byId),
    validarCampos,
], Obtenerprod);
//Crear categoria/cualquier persona con token válido
routerprod.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es Id de Mongo valido').isMongoId(),
    check('categoria').custom(existectg_byId),
    validarCampos
], Crearprod);
//Actualizar registro por ID _privado_cualquiera con token valido
routerprod.put('/:id', [
    validarJWT,
    //check('id', 'Id no valido').isMongoId(),
    check('id').custom(existeprod_byId),
    validarCampos
], Actualizarprod);
//Borra categoria _ admin user
routerprod.delete('/:id', [
    validarJWT,
    Role_admin,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existeprod_byId),
    validarCampos
], Deleteprod);


export default routerprod

