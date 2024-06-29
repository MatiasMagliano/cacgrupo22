import { pool } from "../config/app-config.js";

export class Categoria {
    async getCategorias() {
        try {
            let consulta = 'SELECT * FROM categorias;';
            const [rows] = await pool.query(consulta);

            return rows;
        } catch (error) {
            throw new Error("Error de base de datos: " + error.message);
        }
    }
};