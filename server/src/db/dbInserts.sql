INSERT INTO usuario (nombre_usuario, apellido_usuario, contraseña_usuario, rol_usuario) VALUES
('Carlos', 'Ramirez', 'hash123', 'admin'),
('Laura', 'Gomez', 'hash456', 'cajero'),
('Andres', 'Lopez', 'hash789', 'mesero'),
('Sofia', 'Martinez', 'hash321', 'mesero'),
('Juan', 'Perez', 'hash654', 'cocinero');

INSERT INTO zona (nombre_zona) VALUES
('Terraza'),
('Interior'),
('VIP');

INSERT INTO estacion (nombre_estacion, descripcion_estacion) VALUES
('Parrilla', 'Carnes y asados'),
('Barra', 'Bebidas'),
('Cocina caliente', 'Platos principales');

INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES
('Entradas', 'Aperitivos'),
('Platos fuertes', 'Comidas principales'),
('Bebidas', 'Refrescos y bebidas'),
('Postres', 'Dulces');

INSERT INTO ingrediente (nombre_ingrediente, stock_ingrediente, unidades_ingrediente) VALUES
('Carne', 50, 'kg'),
('Pollo', 30, 'kg'),
('Lechuga', 100, 'unidad'),
('Tomate', 80, 'unidad'),
('Queso', 20, 'kg'),
('Aceite', 10, 'l');

INSERT INTO receta (nombre_receta) VALUES
('Hamburguesa clasica'),
('Pollo a la parrilla'),
('Ensalada fresca');

INSERT INTO mesa (capacidad_mesa, estado_mesa, id_zona_mesa) VALUES
(4, 'libre', 1),
(2, 'ocupada', 2),
(6, 'reservada', 3),
(4, 'libre', 1);

INSERT INTO pedido (id_mesa_pedido, id_mesero_pedido) VALUES
(1, 3),
(2, 4),
(3, 3);

INSERT INTO factura (monto_total_factura, estado_factura, id_pedido_factura) VALUES
(45000.00, true, 1),
(32000.00, true, 2),
(15000.00, false, 3);

INSERT INTO detalleReceta (cantidad_ingrediente, id_receta_detalleReceta, id_ingrediente_detalleReceta) VALUES
(0.2, 1, 1),
(1, 1, 3),
(1, 1, 4),
(0.3, 2, 2),
(2, 3, 3);

INSERT INTO producto (nombre_producto, precio_producto, id_receta_producto, id_estacion_producto, id_categoria_producto) VALUES
('Hamburguesa', 15000, 1, 1, 2),
('Pollo a la parrilla', 18000, 2, 1, 2),
('Ensalada', 12000, 3, 3, 1),
('Gaseosa', 5000, NULL, 2, 3);

INSERT INTO comanda (cantidad_producto_comanda, id_producto_comanda, id_pedido_comanda) VALUES
(2, 1, 1),
(1, 4, 1),
(1, 2, 2),
(3, 3, 3);