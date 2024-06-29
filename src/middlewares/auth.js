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

        // RENOVACIÓN AUTOMÁTICA DEL TOKEN (por ejemplo, dentro de 5 minutos)
        const ahora = Math.floor(Date.now() / 1000);
        const tokenExpiry = decoded.exp;
        const timeToExpiry = tokenExpiry - ahora;

        if (timeToExpiry < 300) {
            // Genera un nuevo token
            const newToken = jwt.sign({ id: decoded.id, username: decoded.username }, cookie.secret, { expiresIn: cookie.expiracion });
            res.cookie('token', newToken, { httpOnly: true });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error al verificar el token JWT:', err);
        if (err.name === 'TokenExpiredError') {
          req.flash('error_msg', 'Sesión vencida. Por favor, inicia sesión nuevamente.');
          return res.redirect('/login');
      } else {
          req.flash('error_msg', 'Error al verificar el token. Por favor, inicia sesión nuevamente.');
          return res.redirect('/login');
      }
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