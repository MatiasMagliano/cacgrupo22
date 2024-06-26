/* *** NOMENCLADOR DE RUTAS CON AUTENTICACIÓN *** */

import express from 'express';

import { ControladorAuth } from '../controladores/controlador-auth.js';
import { Autenticado } from '../middlewares/auth.js';

// instanciación del router de express
const router = express.Router();

const controladorAuth = new ControladorAuth();

// declaración de las rutas públicas con inclusión de middleware si es requerido
router.post("/login", controladorAuth.dashboard);
router.post("/registro", controladorAuth.registro);
router.get("/dashboard", Autenticado, controladorAuth.dashboard);

export {
    router
}