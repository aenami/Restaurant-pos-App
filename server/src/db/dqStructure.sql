-- -----------------
-- --- ENUM TYPES --
-- -----------------
CREATE TYPE rol_enum AS ENUM ('admin', 'cajero', 'mesero', 'cocinero');
CREATE TYPE estado_mesa_enum AS ENUM('ocupada', 'reservada', 'libre', 'no disponible');
CREATE TYPE unidades_ingrediente_enum AS ENUM('unidad', 'g', 'kg','ml', 'l');
CREATE TYPE estado_pedido_enum AS ENUM('en proceso', 'entregado');
CREATE TYPE estado_comanda_enum AS ENUM('en espera', 'en proceso', 'esperando entrega', 'entregado');

-- -------------------
-- -- SIMPLE TABLES --
-- -------------------

-- 01 USUARIO
CREATE TABLE usuario (
    id_usuario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    apellido_usuario VARCHAR(60) NOT NULL,
    email_usuario VARCHAR(120) NOT NUll,
    fecha_creacion_usuario DATE DEFAULT NOW(),
    password_usuario VARCHAR(200) NOT NULL,
    rol_usuario rol_enum NOT NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT unique_email_usuario UNIQUE(email_usuario)
);

-- 02 ZONA
CREATE TABLE zona (
    id_zona INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_zona VARCHAR(50) NOT NULL
);

-- 03 estacion
CREATE TABLE estacion (
    id_estacion INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_estacion VARCHAR(50) NOT NULL,
    descripcion_estacion VARCHAR(200)
);

-- 04 categoria
CREATE TABLE categoria (
    id_categoria INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL,
    descripcion_categoria VARCHAR(200)
);

-- 05 ingrediente
CREATE TABLE ingrediente (
    id_ingrediente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_ingrediente VARCHAR(50) NOT NULL,
    stock_ingrediente INT,
    unidades_ingrediente unidades_ingrediente_enum NOT NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT chk_stock_ingrediente  CHECK(stock_ingrediente >= 0)
);

-- 06 receta
CREATE TABLE receta (
    id_receta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_receta VARCHAR(50) NOT NULL
);
 
-- --------------------
-- -- COMPLEX TABLES --
-- --------------------

-- 07 mesa
CREATE TABLE mesa (
    id_mesa INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    capacidad_mesa SMALLINT NOT NULL,
    estado_mesa estado_mesa_enum DEFAULT 'libre',

    id_zona_mesa INT, 

    -- RELATIONSHIPS
    CONSTRAINT fk_id_zona_mesa FOREIGN KEY (id_zona_mesa) REFERENCES zona(id_zona) ON DELETE SET NULL
);

-- 08 pedido
CREATE TABLE pedido (
    id_pedido INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    hora_pedido TIME DEFAULT CURRENT_TIME,
    estado_pedido estado_pedido_enum DEFAULT 'en proceso',
    es_combo BOOLEAN DEFAULT FALSE,

    id_mesa_pedido INT ,
    id_mesero_pedido INT,
    
    -- RELATIONSHIPS
    CONSTRAINT fk_id_mesa_pedido FOREIGN KEY (id_mesa_pedido) REFERENCES mesa(id_mesa) ON DELETE SET NULL,
    CONSTRAINT fk_id_mesero_pedido FOREIGN KEY (id_mesero_pedido) REFERENCES usuario(id_usuario) ON DELETE SET NULL

);

-- 09 factura
CREATE TABLE factura (
    id_factura INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_emision_factura DATE DEFAULT NOW(),
    hora_emision_factura TIME DEFAULT NOW(),
    monto_total_factura NUMERIC(10,2),
    estado_factura BOOLEAN,

    id_pedido_factura INT,

    -- RELATIONSHIPS
    CONSTRAINT fk_id_pedido_factura FOREIGN KEY (id_pedido_factura) REFERENCES pedido(id_pedido) ON DELETE SET NULL
);

-- 10 detalleReceta
CREATE TABLE detalleReceta (
    id_detalleReceta INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cantidad_ingrediente NUMERIC(10,2),

    id_receta_detalleReceta INT,
    id_ingrediente_detalleReceta INT,

    -- RELATIONSHIPS
    CONSTRAINT fk_id_receta_detalleReceta FOREIGN KEY (id_receta_detalleReceta) REFERENCES receta(id_receta) ON DELETE SET NULL,
    CONSTRAINT fk_id_ingrediente_detalleReceta FOREIGN KEY (id_ingrediente_detalleReceta) REFERENCES ingrediente(id_ingrediente) ON DELETE SET NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT chk_cantidad_ingrediente CHECK(cantidad_ingrediente >= 0 )
);

-- 11 producto
CREATE TABLE producto (
    id_producto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_producto VARCHAR(50) NOT NULL,
    precio_producto NUMERIC(10,2) NOT NULL,
    
    id_receta_producto INT,
    id_estacion_producto INT,
    id_categoria_producto INT,

     -- RELATIONSHIPS
    CONSTRAINT fk_id_receta_producto FOREIGN KEY (id_receta_producto) REFERENCES receta(id_receta) ON DELETE SET NULL,
    CONSTRAINT fk_id_estacion_producto FOREIGN KEY (id_estacion_producto) REFERENCES estacion(id_estacion) ON DELETE SET NULL,
    CONSTRAINT fk_id_categoria_producto FOREIGN KEY (id_categoria_producto) REFERENCES categoria(id_categoria) ON DELETE SET NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT chk_precio_producto CHECK(precio_producto > 0)
);

-- 12 comanda
CREATE TABLE comanda (
    id_comanda INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    estado_comanda estado_comanda_enum DEFAULT 'en espera',
    cantidad_producto_comanda INT NOT NULL,

    id_producto_comanda INT,
    id_pedido_comanda INT,

    -- RELATIONSHIPS
    CONSTRAINT fk_id_producto_comanda FOREIGN KEY (id_producto_comanda) REFERENCES producto(id_producto) ON DELETE SET NULL,
    CONSTRAINT fk_id_pedido_comanda FOREIGN KEY (id_pedido_comanda) REFERENCES pedido(id_pedido) ON DELETE SET NULL,

    -- LOGIC CONSTRAINTS
    CONSTRAINT chk_cantidad_producto_comanda CHECK(cantidad_producto_comanda > 0)
)