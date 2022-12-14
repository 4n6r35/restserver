
import { Router } from "express"
import { check } from "express-validator";
import { login } from "../controllers/auth.js";
import validarCampos from "../middlewares/validar_campos.js";

const routerauth = Router();

routerauth.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'contraseña obligatoria').not().isEmpty(),
    validarCampos
], login);

export default routerauth;
