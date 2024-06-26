/* *** SCRIPT PUNTO DE PARTIDA DE LA APP *** */

// modulos nativos
import path from "path";

// dependencias
import express from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

// constantes
import { APP_PORT, VIEWS, cookie } from "./src/config/app-config.js";

// inicialización de la app EXPRESSJS
const app = express();

// middlewares y acceso a las plantilas y directorios públicos
app.use(express.static('public'));
app.use("/styles/css", express.static(path.resolve(process.cwd(), "node_modules/bootstrap/dist/css")));
app.use("/styles/css/icons", express.static(path.resolve(process.cwd(), "node_modules/bootstrap-icons/font")));
app.use("/js", express.static(path.resolve(process.cwd(), "node_modules/bootstrap/dist/js")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// configuración de la sesión de express necesario para mensajería flash
app.use(session({
    secret: cookie.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// integración de mensajería flash a páginas
app.use(flash());

// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// andamiaje de plantillas ejs
app.set('views', VIEWS);
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', path.resolve(VIEWS, "layout.ejs"));

// rutas para las vistas públicas
import { router as rutas_publicas } from "./src/rutas/rutas-publicas.js";
app.use("/", rutas_publicas);

// rutas para las vistas con autenticación
import { router as rutas_auth } from "./src/rutas/rutas-auth.js";
app.use("/", rutas_auth);

// handle del error 404
app.use((req, res) => {
    res.status(404).render(path.resolve(VIEWS, "404.ejs"));
});



// servidor web de nodejs
app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado en el puerto ${APP_PORT}...`);
});