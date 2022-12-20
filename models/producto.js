
import { Schema, model } from 'mongoose'

const productoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String },
});

productoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;

}

export default model('Producto', productoSchema);

