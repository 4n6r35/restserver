import express from 'express'
import cors from 'cors'
import userRouter from '../routers/user.js';
import Connnectiondb from '../database/configdb.js'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar Base de datos
        this.ConectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de app
        this.routes();
    }

    async ConectarDB() {
        await Connnectiondb()
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, userRouter)
    }

    Port_listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server }