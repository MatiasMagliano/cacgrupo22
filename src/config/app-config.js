/* *** CONFIG GLOBAL DE LA APP *** */

import { } from "dotenv/config.js";
import { createPool } from "mysql2/promise";
import path from "path";

// puerto Express de la aplicación, tomada del .env
const APP_PORT = process.env.APP_PORT;

// path a las vistas (process.CurrentWorkDirectory)
const VIEWS = path.resolve(process.cwd(), "src", "vistas");

// variables JWT y cookies de sesión
const cookie = {
    nombre: process.env.COOKIE_NAME,
    secret: process.env.JWT_SECRET,
    expiracion: process.env.JWT_EXPIRES_IN,
    exp_cookie: process.env.COOKIE_EXPIRES
}


// administración del pool de conexiones a la base de datos
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 5
});

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('pool.getConnection() -> Conectado a la base de datos');
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos: ', err);
    });

const appdevsatus = {
    status: process.env.APP_DEV_STATUS
}

// paso a disponibilidad de todas las constantes globales
export {
    APP_PORT,
    VIEWS,
    pool,
    cookie,
    appdevsatus
};