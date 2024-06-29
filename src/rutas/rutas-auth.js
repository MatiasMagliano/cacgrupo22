/* *** NOMENCLADOR DE RUTAS CON AUTENTICACIÓN *** */

import express from 'express';

import { ControladorAuth } from '../controladores/controlador-auth.js';
import { Autenticado } from '../middlewares/auth.js';
import { validarProductoNuevo } from '../middlewares/validar-producto-nuevo.js';

// instanciación del router de express
const router = express.Router();

const controladorAuth = new ControladorAuth();

// declaración de las rutas públicas con inclusión de middleware si es requerido
router.post("/login", controladorAuth.login);
router.post("/registro", controladorAuth.registro);
router.get("/dashboard", Autenticado, controladorAuth.dashboard);
router.get("/dashboard/productos", Autenticado, controladorAuth.productosEdicion);
router.get("/dashboard/agregarproducto", Autenticado, controladorAuth.addProduct); // envía formulario de nuevo producto
router.get("/dashboard/editarproducto/:id", Autenticado, controladorAuth.editProduct); // envía formulario para editar un producto
router.post("/dashboard/agregarproducto", Autenticado, validarProductoNuevo, controladorAuth.nuevoProducto); // procesa el formulario
router.get("/dashboard/categorias", Autenticado, controladorAuth.categorias); //envía página con las categorías
router.get("/dashboard/agregarcategoria", Autenticado, controladorAuth.addCategory); // envía formulario de nueva categoría
router.post("/dashboard/agregarcategoria", Autenticado, controladorAuth.nuevoCategoria); // procesa formulario
router.get("/logout", Autenticado, controladorAuth.logout);

export {
    router
}