/* *** NOMENCLADOR DE RUTAS PÚBLICAS *** */

import express from 'express';

import { ControladorPublico } from '../controladores/controlador-publico.js';

// instanciación del router de express
const router = express.Router();

const controladorPublico = new ControladorPublico();

// declaración de las rutas públicas
router.get("/", controladorPublico.index);
router.get("/login", controladorPublico.login);
router.get("/registro", controladorPublico.registro);

export {
    router
}