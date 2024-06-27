-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-06-2024 a las 22:17:18
-- Versión del servidor: 10.11.6-MariaDB-0+deb12u1
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prod_gallery`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Accesorios'),
(2, 'Accesorios de Computadora'),
(3, 'Almacenamiento'),
(4, 'Audio'),
(5, 'Deportes'),
(6, 'Electrónica'),
(7, 'Fotografía'),
(8, 'Hogar'),
(9, 'Juegos'),
(10, 'Oficina'),
(11, 'Redes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` float(10,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `marca`, `nombre`, `precio`, `descripcion`, `stock`, `imagen_url`, `thumbnail_url`, `categoria_id`) VALUES
(1, 'Acer', 'Aspire 5', 599.99, 'Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD', 10, '/uploads/1.jpg', '/uploads/thumbnails/1.jpg', 1),
(2, 'Samsung', 'Galaxy S21', 799.49, 'Smartphone con pantalla AMOLED de 6.2 pulgadas, 128GB de almacenamiento', 25, '/uploads/2.jpg', '/uploads/thumbnails/2.jpg', 1),
(3, 'Apple', 'iPad Air', 649.00, 'iPad Air de 10.9 pulgadas con chip A14 Bionic, 64GB de almacenamiento', 15, '/uploads/3.jpg', '/uploads/thumbnails/3.jpg', 1),
(4, 'Bose', 'QuietComfort 35 II', 299.99, 'Auriculares inalámbricos con cancelación de ruido activa', 40, '/uploads/4.jpg', '/uploads/thumbnails/4.jpg', 2),
(5, 'Dell', 'UltraSharp 27', 459.99, 'Monitor de 27 pulgadas con resolución 4K UHD', 20, '/uploads/5.jpg', '/uploads/thumbnails/5.jpg', 1),
(6, 'Logitech', 'MX Keys', 99.99, 'Teclado inalámbrico iluminado con teclas cómodas y precisas', 50, '/uploads/6.jpg', '/uploads/thumbnails/6.jpg', 3),
(7, 'Logitech', 'MX Master 3', 99.99, 'Ratón inalámbrico ergonómico con múltiples botones programables', 45, '/uploads/7.jpg', '/uploads/thumbnails/7.jpg', 3),
(8, 'Garmin', 'Forerunner 245', 299.99, 'Reloj inteligente con GPS y funciones avanzadas de seguimiento de fitness', 30, '/uploads/8.jpg', '/uploads/thumbnails/8.jpg', 4),
(9, 'Seagate', '2TB External HDD', 69.99, 'Disco duro portátil de 2TB con conexión USB 3.0', 75, NULL, NULL, 5),
(10, 'HP', 'Envy 6055', 129.99, 'Impresora multifuncional inalámbrica con soporte para impresión móvil', 15, NULL, NULL, 6),
(11, 'Sony', 'Bravia 55', 899.99, 'Televisor 4K UHD de 55 pulgadas con HDR y Smart TV', 10, NULL, NULL, 1),
(12, 'Sony', 'PlayStation 5', 499.99, 'Consola de última generación con soporte para juegos en 4K', 5, NULL, NULL, 7),
(13, 'Samsonite', 'Laptop Backpack', 49.99, 'Mochila para laptop con múltiples compartimentos y protección acolchada', 60, NULL, NULL, 8),
(14, 'Canon', 'EOS M50', 649.00, 'Cámara sin espejo con lente EF-M 15-45mm y grabación de video en 4K', 20, NULL, NULL, 9),
(15, 'Blue', 'Yeti Microphone', 129.99, 'Micrófono USB de calidad de estudio con múltiples patrones de grabación', 35, NULL, NULL, 2),
(16, 'JBL', 'Charge 4', 149.95, 'Altavoz portátil Bluetooth resistente al agua con sonido potente', 50, NULL, NULL, 2),
(17, 'Sony', 'Blu-ray Player', 89.99, 'Reproductor de Blu-ray con soporte para discos 3D y reproducción de medios USB', 40, NULL, NULL, 1),
(18, 'Netgear', 'Nighthawk Router', 199.99, 'Router WiFi de alto rendimiento con tecnología de doble banda', 25, NULL, NULL, 10),
(19, 'Keurig', 'K-Elite', 139.99, 'Cafetera de cápsulas con múltiples tamaños de preparación y función de agua caliente', 30, NULL, NULL, 11),
(20, 'Philips', 'Air Fryer', 199.95, 'Freidora de aire con tecnología Rapid Air para cocinar con menos aceite', 20, NULL, NULL, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registered` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria` (`categoria_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
