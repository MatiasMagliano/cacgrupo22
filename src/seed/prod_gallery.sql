-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 25-06-2024 a las 17:56:44
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
DROP SCHEMA IF EXISTS prod_gallery;
CREATE SCHEMA prod_gallery;
USE prod_gallery;
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
  `categoria` varchar(50) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `marca`, `nombre`, `precio`, `descripcion`, `stock`, `categoria`, `imagen_url`, `thumbnail_url`) VALUES
(1, 'Acer', 'Aspire 5', 599.99, 'Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD', 10, 'Electrónica', '/uploads/1.jpg', '/uploads/thumbnails/1.jpg'),
(2, 'Samsung', 'Galaxy S21', 799.49, 'Smartphone con pantalla AMOLED de 6.2 pulgadas, 128GB de almacenamiento', 25, 'Electrónica', '/uploads/2.jpg', '/uploads/thumbnails/2.jpg'),
(3, 'Apple', 'iPad Air', 649.00, 'iPad Air de 10.9 pulgadas con chip A14 Bionic, 64GB de almacenamiento', 15, 'Electrónica', '/uploads/3.jpg', '/uploads/thumbnails/3.jpg'),
(4, 'Bose', 'QuietComfort 35 II', 299.99, 'Auriculares inalámbricos con cancelación de ruido activa', 40, 'Audio', '/uploads/4.jpg', '/uploads/thumbnails/4.jpg'),
(5, 'Dell', 'UltraSharp 27', 459.99, 'Monitor de 27 pulgadas con resolución 4K UHD', 20, 'Electrónica', '/uploads/5.jpg', '/uploads/thumbnails/5.jpg'),
(6, 'Logitech', 'MX Keys', 99.99, 'Teclado inalámbrico iluminado con teclas cómodas y precisas', 50, 'Accesorios de Computadora', '/uploads/6.jpg', '/uploads/thumbnails/6.jpg'),
(7, 'Logitech', 'MX Master 3', 99.99, 'Ratón inalámbrico ergonómico con múltiples botones programables', 45, 'Accesorios de Computadora', '/uploads/7.jpg', '/uploads/thumbnails/7.jpg'),
(8, 'Garmin', 'Forerunner 245', 299.99, 'Reloj inteligente con GPS y funciones avanzadas de seguimiento de fitness', 30, 'Deportes', '/uploads/8.jpg', '/uploads/thumbnails/8.jpg'),
(9, 'Seagate', '2TB External HDD', 69.99, 'Disco duro portátil de 2TB con conexión USB 3.0', 75, 'Almacenamiento', NULL, NULL),
(10, 'HP', 'Envy 6055', 129.99, 'Impresora multifuncional inalámbrica con soporte para impresión móvil', 15, 'Oficina', NULL, NULL),
(11, 'Sony', 'Bravia 55', 899.99, 'Televisor 4K UHD de 55 pulgadas con HDR y Smart TV', 10, 'Electrónica', NULL, NULL),
(12, 'Sony', 'PlayStation 5', 499.99, 'Consola de última generación con soporte para juegos en 4K', 5, 'Juegos', NULL, NULL),
(13, 'Samsonite', 'Laptop Backpack', 49.99, 'Mochila para laptop con múltiples compartimentos y protección acolchada', 60, 'Accesorios', NULL, NULL),
(14, 'Canon', 'EOS M50', 649.00, 'Cámara sin espejo con lente EF-M 15-45mm y grabación de video en 4K', 20, 'Fotografía', NULL, NULL),
(15, 'Blue', 'Yeti Microphone', 129.99, 'Micrófono USB de calidad de estudio con múltiples patrones de grabación', 35, 'Audio', NULL, NULL),
(16, 'JBL', 'Charge 4', 149.95, 'Altavoz portátil Bluetooth resistente al agua con sonido potente', 50, 'Audio', NULL, NULL),
(17, 'Sony', 'Blu-ray Player', 89.99, 'Reproductor de Blu-ray con soporte para discos 3D y reproducción de medios USB', 40, 'Electrónica', NULL, NULL),
(18, 'Netgear', 'Nighthawk Router', 199.99, 'Router WiFi de alto rendimiento con tecnología de doble banda', 25, 'Redes', NULL, NULL),
(19, 'Keurig', 'K-Elite', 139.99, 'Cafetera de cápsulas con múltiples tamaños de preparación y función de agua caliente', 30, 'Hogar', NULL, NULL),
(20, 'Philips', 'Air Fryer', 199.95, 'Freidora de aire con tecnología Rapid Air para cocinar con menos aceite', 20, 'Hogar', NULL, NULL);

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
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `registered`) VALUES
(2, 'Matías Magliano', 'magliano.matias@gmail.com', '$2a$10$vCuwew1yIN1z8j0P4poy4eT3bwYz0imSSBC81IpUNFcnor5dPb3hC', '2024-06-20 02:08:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
