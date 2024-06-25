/* *** CONTROLADOR PÚBLICO *** */
import path from 'path';
import { VIEWS } from '../config/app-config.js';

// modelos necesarios
import { Producto } from '../modelos/producto.js';
const producto = new Producto();

export class ControladorPublico {
    async index(req, res) {
        let productos = await producto.getProductos(req.query);
        try {
            res.render(
                path.resolve(VIEWS, "publicas", "homepage"), {
                    productos: productos
                });
        } catch (error) {
            throw error;
        }
    }

    async login(req, res) {
        try {
            res.render(
                path.resolve(VIEWS, "publicas", "login"), {
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async registro(req, res) {
        try {
            res.render(
                path.resolve(VIEWS, "publicas", "registro"), {
                }
            );
        } catch (error) {
            throw error;
        }
    }
}