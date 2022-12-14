import { Router } from "express"
import { check } from "express-validator";
import { ExisteusuarioporId, emailExiste, esRoleValido } from "../helpers/db_validators.js";
import validarCampos from "../middlewares/validar_campos.js";
import validarJWT from "../middlewares/validar_jws.js";
import { Role_admin, tieneRole } from "../middlewares/validar_roles.js";
import {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
} from "../controllers/user.js";



const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(ExisteusuarioporId),
    check('role').custom(esRoleValido),
    validarCampos
], userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Contraseña obligatoria y debe ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'correo no valido').isEmail(),
    check('email').custom(emailExiste),
    //check('role', 'rol invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], userPost);

router.delete('/:id', [
    validarJWT,
    Role_admin,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(ExisteusuarioporId),
    validarCampos
], userDelete);

router.patch('/', userPatch);


export default router;