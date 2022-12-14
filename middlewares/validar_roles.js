
import { response } from "express"

const Role_admin = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Verificar el role sin validar el token'
        });
    }
    const { role, name } = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no administrador/no puedes ejecutar esta acción`
        })
    }
    next();

}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        //ver que contiene el return
        //console.log(roles, req.usuario.role);
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Verificar el role sin validar el token'
            });
        }
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Ejecución permitida para los roles: ${roles} `
            })
        }
        next();
    }
}

export { Role_admin, tieneRole } 
