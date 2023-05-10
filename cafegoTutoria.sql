-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2023 a las 22:26:01
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cafego`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cafeterias`
--

CREATE TABLE `cafeterias` (
  `IDCafeteria` int(11) NOT NULL,
  `NombreCafeteria` varchar(50) NOT NULL,
  `PropietarioCafeteria` varchar(50) NOT NULL,
  `DireccionCafeteria` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cafeterias`
--

INSERT INTO `cafeterias` (`IDCafeteria`, `NombreCafeteria`, `PropietarioCafeteria`, `DireccionCafeteria`) VALUES
(1, 'PioBaroja', 'Raquel', 'CalleRandom'),
(2, 'Orcasitas', 'Manolo', 'CalleFalsa'),
(3, 'PuertaBonita', 'Lucas', 'AvenidaRobo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `IDCategoria` int(11) NOT NULL,
  `NombreCategoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`IDCategoria`, `NombreCategoria`) VALUES
(1, 'Bebida fria'),
(2, 'Bebida caliente'),
(3, 'Snack');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles de pedido`
--

CREATE TABLE `detalles de pedido` (
  `IDPedidoDetalle` int(11) NOT NULL,
  `IDProductoDetalle` int(11) NOT NULL,
  `IDUsuarioDetalle` int(11) NOT NULL,
  `CantidadProductoDetalle` int(11) NOT NULL,
  `PrecioProductoDetalle` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalles de pedido`
--

INSERT INTO `detalles de pedido` (`IDPedidoDetalle`, `IDProductoDetalle`, `IDUsuarioDetalle`, `CantidadProductoDetalle`, `PrecioProductoDetalle`) VALUES
(1, 2, 1, 1, 1.5),
(1, 3, 1, 1, 0.75),
(2, 1, 1, 1, 0.75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `IDPedido` int(11) NOT NULL,
  `IDUsuarioPedido` int(11) NOT NULL,
  `IDCafeteriaPedido` int(11) NOT NULL,
  `FechaPedido` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`IDPedido`, `IDUsuarioPedido`, `IDCafeteriaPedido`, `FechaPedido`) VALUES
(1, 1, 1, '2023-05-10'),
(2, 2, 1, '2023-05-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `IDProducto` int(11) NOT NULL,
  `NombreProducto` varchar(50) NOT NULL,
  `Categoria` int(11) NOT NULL,
  `Frio` tinyint(1) NOT NULL,
  `UnidadProducto` int(5) NOT NULL,
  `PrecioProducto` double NOT NULL,
  `DescripcionProducto` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`IDProducto`, `NombreProducto`, `Categoria`, `Frio`, `UnidadProducto`, `PrecioProducto`, `DescripcionProducto`) VALUES
(1, 'Coca-Cola', 1, 1, 10, 1.5, 'Bebida gaseosa con sabor cola'),
(2, 'Sprite', 1, 1, 5, 1.5, 'Bebida gaseosa'),
(3, 'Patatas', 3, 0, 17, 0.75, 'Bolsa de aire con algo de patatas'),
(4, 'FantaNaranja', 1, 1, 17, 1.2, 'Bebida refrescante sabor naranja'),
(5, 'Cafe', 2, 0, 400, 1.25, 'Cafe'),
(6, 'Gublins', 3, 1, 40, 1, 'Snacks de trigo con sabor barbacoa'),
(7, 'Infusion', 2, 0, 400, 1.25, 'Infusiones de distintos sabores'),
(8, 'Pringles', 3, 0, 20, 1.5, 'Snacks de patata'),
(9, 'Croissant', 3, 0, 15, 1.3, 'Croissant recién hechos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IDUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(50) NOT NULL,
  `CorreoUsuario` varchar(50) NOT NULL,
  `PassUsuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`IDUsuario`, `NombreUsuario`, `CorreoUsuario`, `PassUsuario`) VALUES
(1, 'Alex', 'alex@educamadrid.com', 'alex'),
(2, 'Maribel', 'maribel@educamadrid.es', 'maribel'),
(3, 'Belen', 'belen@educamadrid.es', 'belen');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cafeterias`
--
ALTER TABLE `cafeterias`
  ADD PRIMARY KEY (`IDCafeteria`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`IDCategoria`);

--
-- Indices de la tabla `detalles de pedido`
--
ALTER TABLE `detalles de pedido`
  ADD PRIMARY KEY (`IDPedidoDetalle`,`IDProductoDetalle`),
  ADD KEY `fk_prodPedi` (`IDProductoDetalle`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`IDPedido`),
  ADD KEY `fk_Usuario` (`IDUsuarioPedido`),
  ADD KEY `fk_cafeteria` (`IDCafeteriaPedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`IDProducto`),
  ADD KEY `fk_categoria` (`Categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IDUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cafeterias`
--
ALTER TABLE `cafeterias`
  MODIFY `IDCafeteria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `IDCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `IDPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `IDProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles de pedido`
--
ALTER TABLE `detalles de pedido`
  ADD CONSTRAINT `fk_pedido` FOREIGN KEY (`IDPedidoDetalle`) REFERENCES `pedidos` (`IDPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_prodPedi` FOREIGN KEY (`IDProductoDetalle`) REFERENCES `productos` (`IDProducto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_Usuario` FOREIGN KEY (`IDUsuarioPedido`) REFERENCES `usuarios` (`IDUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cafeteria` FOREIGN KEY (`IDCafeteriaPedido`) REFERENCES `cafeterias` (`IDCafeteria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`Categoria`) REFERENCES `categorias` (`IDCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
