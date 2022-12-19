import { Router } from "express";
import { buscar } from "../controllers/buscar.js";




const buscar_router = Router();

buscar_router.get('/:coleccion/:termino', buscar);



export default buscar_router;