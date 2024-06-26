import { body, validationResult } from 'express-validator';
import { cookie } from "../config/app-config.js"
import jwt from 'jsonwebtoken';

// Middleware para verificar si el usuario está autenticado
export const Autenticado = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash('error_msg', 'Token no proporcionado');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, cookie.secret);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error al verificar el token JWT:', err);
        req.flash('error_msg', 'Sesión no válida. Por favor, inicia sesión nuevamente.');
        return res.redirect('/login');
    }
};

// Middleware de validación para el registro
export const ValidarRegistro = [
  body('username')
    .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres')
    .trim()
    .escape(),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .trim()
    .escape(),
  body('password_repeat')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
    .trim()
    .escape(),
  // Middleware para manejar los resultados de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error_msg', errors.array().map(err => err.msg).join(' '));
      return res.redirect('/registro');
    }
    next();
  }
];