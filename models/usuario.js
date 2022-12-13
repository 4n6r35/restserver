
import { Schema, model } from 'mongoose';

const usuarioShema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password obligatorio']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

usuarioShema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user
}

export default model('Usuario', usuarioShema)

