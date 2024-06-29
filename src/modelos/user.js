import { pool } from '../config/app-config.js';
import bcrypt from 'bcryptjs';

export class Usuario {

    // Método para encontrar un usuario por su nombre de usuario
    async findByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el usuario por nombre de usuario');
        }
    }

    // Método para crear un nuevo usuario
    async createUser(nombre, username, hashedPassword) {
        try {
            const [result] = await pool.query(
                'INSERT INTO users (name, username, password, registered) VALUES (?, ?, ?, NOW())',
                [nombre, username, hashedPassword]
            );
            console.log("resultados de INSERT INTO: ", result)
            return result;
        } catch (error) {
            return new Error('Error al crear el usuario');
        }
    }

    // Método para verificar la contraseña de un usuario
    async verifyPassword(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}
