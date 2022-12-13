
import { Schema, model } from 'mongoose'

const rolSchema = Schema({
    role: {
        type: String,
        require: [true, 'El rol es obligatorio'],
    }
});

export default model('role', rolSchema);

