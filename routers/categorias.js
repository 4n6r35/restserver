
import { Router } from "express"
import { check } from "express-validator";
import { Actualizarctg, Crearctg, Deletectg, Obtenerctg, Obtenerctg_pag } from "../controllers/ctg.js";
import { existectg_byId } from "../helpers/db_validators.js";
import validarCampos from "../middlewares/validar_campos.js";
import validarJWT from "../middlewares/validar_jws.js";
import { Role_admin } from "../middlewares/validar_roles.js";

const routerctg = Router();
/**
 * {{url}} de la api/categorias
 */

//Obtener todas las categorias
routerctg.get('/', Obtenerctg_pag);
//Obtener por categoria/id_publico
routerctg.get('/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existectg_byId),
    validarCampos,
], Obtenerctg);
//Crear categoria/cualquier persona con token válido
routerctg.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], Crearctg);
//Actualizar registro por ID _privado_cualquiera con token valido
routerctg.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('id').custom(existectg_byId),
    validarCampos
], Actualizarctg);
//Borra categoria _ admin user
routerctg.delete('/:id', [
    validarJWT,
    Role_admin,
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existectg_byId),
    validarCampos
], Deletectg);

export default routerctg