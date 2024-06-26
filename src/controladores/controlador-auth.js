import sharp from 'sharp';
import { pool, VIEWS, cookie, appdevsatus } from '../config/app-config.js';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// modelos necesarios
import { Usuario } from "../modelos/user.js"
const modeloUsuario = new Usuario();

export class ControladorAuth {

    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Buscar el usuario por su nombre de usuario
            const usuario = await modeloUsuario.findByUsername(username);

            // Si el usuario no existe
            if (!usuario) {
                req.flash('error_msg', '¡Nombre de usuario o contraseña incorrectos!');
                return res.redirect('/login');
            }

            // Verificar la contraseña
            const passwordValida = await ModeloUsuario.verificarContrasenia(password, usuario.password);
            if (!passwordValida) {
                req.flash('error_msg', '¡Nombre de usuario o contraseña incorrectos!');
                return res.redirect('/login');
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id: usuario.id, username: usuario.username },
                cookie.secret,
                { expiresIn: cookie.expiracion }
            );

            // Establecer la cookie con el JWT
            res.cookie('token', token, {
                httpOnly: true,
                secure: appdevsatus.status === 'production',
                maxAge: cookie.exp_cookie
            }).redirect('/dashboard');

        } catch (error) {
            console.error('Error durante el login:', error);
            req.flash('error_msg', 'Error en el servidor, por favor intente de nuevo más tarde.');
            return res.redirect('/login');
        }
    };

    // método de registro
    async registro(req, res) {
        try {
            const { nombre, username, password } = req.body;

            // Comprobar si el nombre de usuario ya existe
            const [existingUsers] = await pool.query(
                'SELECT id FROM users WHERE LOWER(username) = LOWER(?)',
                [username]
            );

            if (existingUsers.length) {
                req.flash('error_msg', 'Este nombre de usuario ya está en uso!');
                return res.redirect('/registro');
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            await pool.query(
                'INSERT INTO users (name, username, password, registered) VALUES (?, ?, ?, NOW())',
                [nombre, username, hashedPassword]
            );

            // Generar un token JWT
            const token = jwt.sign(
                { username },
                cookie.secret,
                { expiresIn: cookie.expiracion }
            );

            // Establecer el token JWT en una cookie
            res.cookie('token', token, { httpOnly: true });

            req.flash('success_msg', 'Registro exitoso!');
            return res.redirect('/dashboard');

        } catch (error) {
            console.error('Error durante el registro:', error);
            req.flash('error_msg', 'Error en el servidor, por favor intente de nuevo más tarde.');
            return res.redirect('/registro');
        }
    }

    async dashboard(req, res) {
        console.log("Usuario logueado con éxito y navegando desde el dashboard")
        try {
            res.render(
                path.resolve(VIEWS, "auth", "dashboard"), {
                    user: req.user
                }
            );
        } catch (error) {
            
        }
    }

    async nuevoProducto(req, res) {
        const { marca, nombre, precio, descripcion, stock, categoria } = req.body;

        if (!req.files || !req.files.imagen) {
            return res.status(400).send('No se subió ninguna imagen.');
        }

        const imagen = req.files.imagen;

        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();

            const [result] = await connection.query(
                'INSERT INTO productos (marca, nombre, precio, descripcion, stock, categoria) VALUES (?, ?, ?, ?, ?, ?)',
                [marca, nombre, precio, descripcion, stock, categoria]
            );

            const productoId = result.insertId;
            const uploadPath = path.join(__dirname, 'public/uploads', `${productoId}.jpg`);
            const thumbnailPath = path.join(__dirname, 'public/uploads/thumbnails', `${productoId}.jpg`);

            // Guardar la imagen original y convertirla a .jpg
            await imagen.mv(uploadPath);

            // Crear una miniatura de 200x200 píxeles en formato .jpg
            await sharp(uploadPath)
                .resize(200, 200, { withoutEnlargement: true })
                .toFile(thumbnailPath);

            const imagenUrl = '/uploads/' + productoId + '.jpg';
            const thumbnailUrl = '/uploads/thumbnails/' + productoId + '.jpg';

            await connection.query(
                'UPDATE productos SET imagen_url = ?, thumbnail_url = ? WHERE id = ?',
                [imagenUrl, thumbnailUrl, productoId]
            );

            await connection.commit();
            connection.release();

            res.status(201).send('Producto creado con éxito y la imagen subida.');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            const connection = await pool.getConnection();
            await connection.rollback();
            connection.release();
            res.status(500).send('Error al crear el producto.');
        }
    }
}