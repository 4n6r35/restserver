
import role from "../models/role.js";
import usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js"
import Producto from "../models/producto.js"


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

/** 
 * Categoria
*/
const existectg_byId = async (id) => {
    //Verificar si la categoria existe
    const exisCategoria = await Categoria.findById(id);
    if (!exisCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

/** 
 * Producto
*/
const existeprod_byId = async (id) => {
    //Verificar si el producto existe
    const exisProducto = await Producto.findById(id);
    if (!exisProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}


export {
    esRoleValido,
    emailExiste,
    ExisteusuarioporId,
    existectg_byId,
    existeprod_byId
}