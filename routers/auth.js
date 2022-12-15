
import { Router } from "express"
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import validarCampos from "../middlewares/validar_campos.js";

const routerauth = Router();

routerauth.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'contraseña obligatoria').not().isEmpty(),
    validarCampos
], login);

routerauth.post('/google', [
    check('id_token', 'El token google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

export default routerauth;
