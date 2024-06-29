import { body } from 'express-validator';

export const validarProductoNuevo = [
    // Validar la marca
    body('marca')
        .trim()
        .notEmpty().withMessage('La marca es obligatoria.')
        .isLength({ max: 50 }).withMessage('La marca no debe exceder los 50 caracteres.'),
    
    // Validar el nombre
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre del producto es obligatorio.')
        .isLength({ max: 100 }).withMessage('El nombre no debe exceder los 100 caracteres.'),
    
    // Validar el precio
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.'),
    
    // Validar la categoría
    body('categoria')
        .notEmpty().withMessage('La categoría es obligatoria.')
        .isInt().withMessage('La categoría debe ser un número entero.'),
    
    // Validar el stock
    body('stock')
        .notEmpty().withMessage('El stock es obligatorio.')
        .isInt({ gt: 0 }).withMessage('El stock debe ser un número entero positivo.'),
    
    // Validar la descripción
    body('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ max: 500 }).withMessage('La descripción no debe exceder los 500 caracteres.'),
    
    // Validar la imagen (debe ser un archivo subido)
    // body('foto').custom((value, { req }) => {
    //     if (!req.files || !req.files.foto) {
    //         throw new Error('La imagen es obligatoria.');
    //     }
    //     return true;
    // })
];
