import { pool } from '../config/app-config.js';
import bcrypt from 'bcryptjs';

export class Usuario {

    // Método para encontrar un usuario por su nombre de usuario
    async findByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (error) {
            throw new Error('Error al buscar el usuario por nombre de usuario');
        }
    }

    // Método para crear un nuevo usuario
    async createUser({ name, username, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const [result] = await pool.query(
                'INSERT INTO users (name, username, password, registered) VALUES (?, ?, ?, NOW())',
                [name, username, hashedPassword]
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error al crear el usuario');
        }
    }

    // Método para verificar la contraseña de un usuario
    async verificarContrasenia(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}
