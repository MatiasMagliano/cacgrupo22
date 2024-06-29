import { pool, VIEWS, cookie, appdevsatus } from '../config/app-config.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// modelos necesarios
import { Usuario } from "../modelos/user.js"
const modeloUsuario = new Usuario();
import { Producto } from "../modelos/producto.js"
const modeloProducto = new Producto();
import { Categoria } from "../modelos/categoria.js"
const modeloCategoria = new Categoria();

export class ControladorAuth {

    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Buscar el usuario por su nombre de usuario
            const usuario = await modeloUsuario.findByUsername(username);
            
            // Si el usuario no existe
            if (usuario[0].length > 0) {
                req.flash('error_msg', '¡Nombre de usuario o contraseña incorrectos!');
                return res.redirect('/login');
            }

            // Verificar la contraseña
            const passwordValida = await modeloUsuario.verifyPassword(password, usuario[0].password);
            if (!passwordValida) {
                req.flash('error_msg', '¡Nombre de usuario o contraseña incorrectos!');
                return res.redirect('/login');
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id: usuario[0].id, username: usuario[0].username },
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
            const existingUsers = await modeloUsuario.findByUsername(username);

            if (existingUsers.length > 0) {
                req.flash('error_msg', 'Este nombre de usuario ya está en uso!');
                return res.redirect('/registro');
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            const resultado = await modeloUsuario.createUser(nombre, username, hashedPassword);    
            if (resultado.affectedRows === 0) {
                req.flash('error_msg', 'Error de base de datos. inténtelo más tarde');
                return res.redirect('/registro');
            }

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
        try {
            res.render(
                path.resolve(VIEWS, "auth", "dashboard"), {
                    user: req.user
                }
            );
        } catch (error) {
            
        }
    }

    // método GET que devuelve todos los productos, bajo login
    async productosEdicion(req, res) {
        let productos = await modeloProducto.getProductos(req.query);
        try {
            res.render(
                path.resolve(VIEWS, "publicas", "homepage"), {
                    productos: productos, // la lista de productos
                    user: req.user, // al ser vista con auth, se envía usuario
                    vistaEdit: true, // visibiliza el botón de edición
                    clearfilter: req.url // fija la url de limpiado de form de filtros
                });
        } catch (error) {
            throw error;
        }
    };

    // método GET que devuelve la página para agregar un producto
    async addProduct(req, res) {
        let categorias = await modeloCategoria.getCategorias();
        try {
            res.render(
                path.resolve(VIEWS, "auth", "formAgregarProducto"), {
                    categorias: categorias,
                    user: req.user
                });
        } catch (error) {
            console.error('Error de servidor en "/dashboard/agregarproducto":', error);
            req.flash('error_msg', 'Error en el servidor, por favor intente de nuevo más tarde.');
            return res.redirect('/dashboard');
        }
    };

    // método POST que recibe el formulario de nuevo producto
    async nuevoProducto(req, res) {
        // se valida el formulario en la ruta-auth.js con un middleware
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            console.log("Errores del formulario: ", errores)
            req.flash('error_msg', 'Hay errores en el formulario. Revise sus datos y vuelva a intentar.');
            return res.redirect('/dashboard/agregarproducto');
        }

        // se continua con el agregado del producto
        const { marca, nombre, precio, descripcion, stock, categoria } = req.body;
        // se captura la imagen (si la hay)
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

            req.flash('success_msg', 'Producto agregado con éxito.');
            return res.redirect('/dashboard/productos');

        } catch (error) {
            console.error('Error al crear el producto:', error);
            const connection = await pool.getConnection();
            await connection.rollback();
            connection.release();

            req.flash('error_msg', 'Error al crear el producto.');
            return res.redirect('/dashboard/productos');
        }
    };

    // método GET que devuelve página con formulario para editar producto
    async editProduct(req, res) {};

    // método POST que procesa el formulario de edición de productos
    async editarProducto(req, res) {};

    async categorias(req, res) {};

    async addCategory(req, res) {};

    async nuevoCategoria(req, res) {};
    
    async logout(req, res) {
        try {
            res.clearCookie('token').redirect("/");
        } catch (error) {
            throw error;
        }
    };
}