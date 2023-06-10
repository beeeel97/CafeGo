-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2023 a las 15:01:41
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
(3, 'Snack'),
(4, 'Bocadillos'),
(5, 'Bolleria');

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
  `DescripcionProducto` varchar(200) NOT NULL,
  `LinkImagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`IDProducto`, `NombreProducto`, `Categoria`, `Frio`, `UnidadProducto`, `PrecioProducto`, `DescripcionProducto`, `LinkImagen`) VALUES
(1, 'Coca-Cola', 1, 1, 10, 1.5, 'Bebida gaseosa con sabor cola', 'https://i.imgur.com/WGDiH08.png'),
(2, 'Sprite', 1, 1, 5, 1.5, 'Bebida gaseosa', 'https://i.imgur.com/Zrtk3k0.png'),
(3, 'Patatas', 3, 0, 17, 0.75, 'Bolsa de aire con algo de patatas', 'https://i.imgur.com/U2AUrl6.jpg'),
(4, 'Fanta Naranja', 1, 1, 17, 1.2, 'Bebida refrescante sabor naranja', 'https://i.imgur.com/kUBmwXA.jpg'),
(5, 'Cafe', 2, 0, 400, 1.25, 'Cafe', 'https://i.imgur.com/rSF085R.jpg'),
(6, 'Gublins', 3, 0, 40, 1, 'Snacks de trigo', 'https://i.imgur.com/3v9UXvu.jpg'),
(7, 'Infusion', 2, 0, 400, 1.25, 'Infusiones de distintos sabores', 'https://i.imgur.com/Rp93b85.jpg'),
(8, 'Pringles', 3, 0, 20, 1.5, 'Snacks de patata', 'https://i.imgur.com/5V49eUb.jpg'),
(9, 'Galletas Principe', 3, 0, 15, 1.3, 'Paquete pequeño de galletas principe', 'https://i.imgur.com/Plp90ku.jpg'),
(10, 'Fanta Limon', 1, 1, 50, 1.5, 'Refresco de limón', 'https://i.imgur.com/tPLcyRu.jpg'),
(11, 'Nestea', 1, 1, 80, 1.5, 'Té frío', 'https://i.imgur.com/DNIKFiF.png'),
(12, 'Coca-Cola Zero', 1, 1, 60, 1.5, 'Refresco sin azúcar', 'https://i.imgur.com/JY8csi1.jpg'),
(13, 'Aquarius', 1, 1, 40, 1.5, 'Bebida isotónica', 'https://i.imgur.com/ipyNKqc.jpg'),
(14, 'Red Bull', 1, 1, 90, 1.3, 'Bebida energética', 'https://i.imgur.com/0Ildl23.jpg'),
(15, 'Agua Mineral', 1, 1, 70, 1.25, 'Agua sin gas', 'https://i.imgur.com/zAtonds.jpg'),
(16, 'Chocolate Caliente', 2, 0, 60, 1.25, 'Bebida de chocolate caliente', 'https://i.imgur.com/hKj3ldx.jpg'),
(17, 'Palomitas de Maíz', 3, 0, 80, 1.2, 'Snack de maíz', 'https://i.imgur.com/JuGyHxz.jpg'),
(18, 'Nachos', 3, 0, 60, 1.4, 'Snack de tortilla de maíz', 'https://i.imgur.com/amCNRsd.jpg'),
(19, 'Galletas', 3, 0, 40, 1.15, 'Snack dulce', 'https://i.imgur.com/w8mAHHl.jpg'),
(20, 'Frutos Secos', 3, 0, 90, 1.3, 'Mezcla de frutos secos', 'https://i.imgur.com/v5PHuLe.jpg'),
(21, 'Barrita de Cereal', 3, 0, 70, 1.25, 'Barrita energética', 'https://i.imgur.com/71OhrOy.png'),
(22, 'Coca-Cola Light', 1, 1, 50, 1.5, 'Refresco de cocacola light', 'https://i.imgur.com/fOgNcf8.jpg'),
(23, 'Batido de Chocolate', 1, 1, 80, 1.2, 'Batido de Chocolate', 'https://i.imgur.com/tT4lNXU.jpg'),
(24, 'Monster', 1, 1, 40, 1.15, 'Bebida energética', 'https://i.imgur.com/I0ms8Oo.jpg'),
(25, 'Agua Mineral con Gas', 1, 1, 70, 1.25, 'Agua con gas', 'https://i.imgur.com/84ep2SO.jpg'),
(26, 'Cafe Leche', 2, 0, 60, 1.25, 'Café con leche caliente y espuma', 'https://i.imgur.com/rq9iiJ6.jpg'),
(27, 'Café Descafeinado', 2, 0, 40, 1.25, 'Café sin cafeína', 'https://i.imgur.com/rSF085R.jpg'),
(28, 'Doritos', 3, 0, 50, 1.3, 'Snack de tortilla de maíz', 'https://i.imgur.com/hJ1NLXJ.jpg'),
(29, 'Cheetos', 3, 0, 80, 1.2, 'Snack de queso', 'https://i.imgur.com/DlegvGt.jpg'),
(30, 'Oreo', 3, 0, 90, 1.3, 'Galleta con relleno de crema', 'https://i.imgur.com/6Adrgto.jpg'),
(31, 'Snickers', 3, 0, 70, 1.25, 'Barrita de Snickers', 'https://i.imgur.com/RsmCh0z.jpg'),
(32, 'Bocadillo de Tortilla', 4, 0, 12, 2, 'Bocadillo de tortilla española', 'https://i.imgur.com/ffqqsBT.png'),
(33, 'Bocadillo de Bacon', 4, 0, 10, 2, 'Bocadillo de bacon', 'https://i.imgur.com/ffqqsBT.png'),
(34, 'Bocadillo BaconQueso', 4, 0, 7, 2.2, 'Bocadillo de bacon y queso', 'https://i.imgur.com/ffqqsBT.png'),
(35, 'Bocadillo Vegetal', 4, 0, 6, 2, 'Bocadillo con lechuga, tomate, mayonesa', 'https://i.imgur.com/ffqqsBT.png'),
(36, 'Bocadillo de Lomo', 4, 0, 15, 2, 'Bocadillo de lomo adobado', 'https://i.imgur.com/ffqqsBT.png'),
(37, 'Bocadillo de Chorizo', 4, 0, 6, 2, 'Bocadillo de chorizo', 'https://i.imgur.com/ffqqsBT.png'),
(38, 'Bocadillo de Salchichón', 4, 0, 10, 2, 'Bocadillo con salchichón', 'https://i.imgur.com/ffqqsBT.png'),
(39, 'Bocadillo AtúnTomate', 4, 0, 6, 2, 'Bocadillo con atún y tomate', 'https://i.imgur.com/ffqqsBT.png'),
(40, 'Bocadillo JamónQueso', 4, 1, 10, 2, 'Bocadillo con jamón york y queso', 'https://i.imgur.com/ffqqsBT.png'),
(41, 'Bocadillo Lomo Ibérico', 4, 0, 10, 2.6, 'Bocadillo con lomo ibérico', 'https://i.imgur.com/ffqqsBT.png'),
(42, 'Bocadillo de Jamón', 4, 0, 10, 2, 'Bocadillo de Jamón Serrano', 'https://i.imgur.com/ffqqsBT.png'),
(43, 'Croissant', 5, 0, 20, 1.5, 'Croissant de hojaldre', 'https://i.imgur.com/GNVYdI6.jpg'),
(44, 'Napolitana de Chocolate', 5, 0, 15, 1.5, 'Napolitana con relleno de chocolate', 'https://i.imgur.com/fxuZ2Zn.jpg'),
(45, 'Napolitana de Crema', 5, 0, 15, 1.5, 'Napolitana con rellena de crema', 'https://i.imgur.com/DLo4IFz.jpg'),
(46, 'Bizcocho casero', 5, 0, 20, 1.3, 'Trozo de bizcocho casero', 'https://i.imgur.com/AUe93Jn.jpg'),
(47, 'Croissant de Chocolate', 5, 0, 30, 1.5, 'Croissant con relleno de chocolate', 'https://i.imgur.com/WOo1KjD.jpg'),
(48, 'Napolitana de Jamón y Queso', 5, 0, 10, 1.5, 'Napolitana con relleno de jamón y queso', 'https://i.imgur.com/axBPD6d.jpg'),
(49, 'Empanada de Atún', 5, 0, 10, 1.5, 'Empanada de hojaldre con relleno de atún', 'https://i.imgur.com/TwKAMHw.jpg'),
(50, 'Empanada de Jamón y Queso', 5, 0, 14, 1.5, 'Empanada de hojaldre con relleno de jamón y queso', 'https://i.imgur.com/TwKAMHw.jpg');

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
(1, 'administrador', 'admin@educamadrid.es', 'admin'),
(2, 'Maribel', 'maribel@educamadrid.es', 'maribel'),
(3, 'Belen', 'belen@educamadrid.es', 'belen'),
(4, 'purificacion', 'puri@educamadrid.es', 'purificacion');

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
  MODIFY `IDCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `IDPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `IDProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IDUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
