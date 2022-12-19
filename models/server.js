import express from 'express'
import cors from 'cors'
import userRouter from '../routers/user.js'
import authRouter from '../routers/auth.js'
import ctgRouter from '../routers/categorias.js'
import prodRouter from '../routers/productos.js'
import buscarRouter from '../routers/buscar.js'
import Connnectiondb from '../database/configdb.js'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.ctgPath = '/api/categorias';
        this.productPath = '/api/productos';
        this.buscarPath = '/api/buscar';


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
        this.app.use(this.authPath, authRouter)
        this.app.use(this.ctgPath, ctgRouter)
        this.app.use(this.productPath, prodRouter)
        this.app.use(this.buscarPath, buscarRouter)
    }

    Port_listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server }