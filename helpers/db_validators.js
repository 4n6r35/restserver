
import role from "../models/role.js";
import usuario from "../models/usuario.js";


const esRoleValido = async (rol = '') => {
    const existe_rol = await role.findOne({ rol })
    if (!existe_rol) {
        throw new Error(`Rol ${rol} no registrado en la Base de Datos`)
    }
}

const emailExiste = async (email = '') => {
    //Verificar si email existe_validación
    const verfEmail = await usuario.findOne({ email });
    if (verfEmail) {
        throw new Error(`El correo ${email} ya se encuentra registrado`)
    }
}

const ExisteusuarioporId = async (id) => {
    //Verificar si email existe_validación
    const exist_user = await usuario.findById(id);
    if (!exist_user) {
        throw new Error(`El id ${id} no existe`)
    }
}


export { esRoleValido, emailExiste, ExisteusuarioporId }