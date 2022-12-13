
import mongoose from "mongoose";

const Connectiondb = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conexión esitosa de Base de Datos online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar base de datos')
    }

}

export default  Connectiondb 