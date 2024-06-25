/* *** CONTROLADOR PÚBLICO *** */
import { VIEWS } from '../config/app-config.js';
import path from 'path';

export class ControladorPublico {
    async index(req, res) {
        try {
            res.render(
                path.resolve(VIEWS, "publicas", "homepage"));
        } catch (error) {
            throw error;
        }
    };
};