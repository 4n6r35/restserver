
import { Schema, model } from 'mongoose'

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

categoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;

}

export default model('Categoria', categoriaSchema);

