require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Datos de ejemplo: 20 productos de ropa y calzado
let productos = [
  {
    id: 1,
    nombre: 'Camiseta Básica',
    descripcion: 'Camiseta de algodón 100% para uso diario.',
    marca: 'UrbanWear',
    precio: 15.99,
    imagen: '/img/camiseta_basica.jpg'
  },
  {
    id: 2,
    nombre: 'Jeans Slim Fit',
    descripcion: 'Jeans ajustados de mezclilla azul.',
    marca: 'DenimPro',
    precio: 39.99,
    imagen: '/img/jeans_slim_fit.jpg'
  },
  {
    id: 3,
    nombre: 'Zapatillas Running',
    descripcion: 'Zapatillas ligeras para correr.',
    marca: 'FastStep',
    precio: 59.99,
    imagen: '/img/zapatillas_running.jpg'
  },
  {
    id: 4,
    nombre: 'Sudadera con Capucha',
    descripcion: 'Sudadera cómoda con capucha y bolsillo frontal.',
    marca: 'UrbanWear',
    precio: 29.99,
    imagen: '/img/sudadera_capucha.jpg'
  },
  {
    id: 5,
    nombre: 'Chaqueta Rompevientos',
    descripcion: 'Chaqueta ligera resistente al viento.',
    marca: 'WindGuard',
    precio: 49.99,
    imagen: '/img/chaqueta_rompevientos.jpg'
  },
  {
    id: 6,
    nombre: 'Botines de Cuero',
    descripcion: 'Botines elegantes de cuero genuino.',
    marca: 'LeatherStep',
    precio: 89.99,
    imagen: '/img/botines_cuero.jpg'
  },
  {
    id: 7,
    nombre: 'Vestido Casual',
    descripcion: 'Vestido fresco y cómodo para el verano.',
    marca: 'FreshLook',
    precio: 34.99,
    imagen: '/img/vestido_casual.jpg'
  },
  {
    id: 8,
    nombre: 'Sandalias Playeras',
    descripcion: 'Sandalias resistentes al agua para la playa.',
    marca: 'BeachWalk',
    precio: 19.99,
    imagen: '/img/sandalias_playeras.jpg'
  },
  {
    id: 9,
    nombre: 'Camisa Formal',
    descripcion: 'Camisa de vestir manga larga.',
    marca: 'ElegantMan',
    precio: 27.99,
    imagen: '/img/camisa_formal.jpg'
  },
  {
    id: 10,
    nombre: 'Falda Plisada',
    descripcion: 'Falda elegante con pliegues.',
    marca: 'ChicStyle',
    precio: 24.99,
    imagen: '/img/falda_plisada.jpg'
  },
  {
    id: 11,
    nombre: 'Pantalón Jogger',
    descripcion: 'Pantalón deportivo cómodo y moderno.',
    marca: 'SportyLife',
    precio: 22.99,
    imagen: '/img/pantalon_jogger.jpg'
  },
  {
    id: 12,
    nombre: 'Zapatos Oxford',
    descripcion: 'Zapatos formales de cuero para hombre.',
    marca: 'ClassicStep',
    precio: 69.99,
    imagen: '/img/zapatos_oxford.jpg'
  },
  {
    id: 13,
    nombre: 'Blusa Estampada',
    descripcion: 'Blusa ligera con estampado floral.',
    marca: 'FlowerMood',
    precio: 18.99,
    imagen: '/img/blusa_estampada.jpg'
  },
  {
    id: 14,
    nombre: 'Short Deportivo',
    descripcion: 'Short de secado rápido para deporte.',
    marca: 'ActiveFit',
    precio: 14.99,
    imagen: '/img/short_deportivo.jpg'
  },
  {
    id: 15,
    nombre: 'Abrigo Largo',
    descripcion: 'Abrigo elegante para invierno.',
    marca: 'WinterLine',
    precio: 99.99,
    imagen: '/img/abrigo_largo.jpg'
  },
  {
    id: 16,
    nombre: 'Tenis Casual',
    descripcion: 'Tenis cómodos para uso diario.',
    marca: 'UrbanStep',
    precio: 44.99,
    imagen: '/img/tenis_casual.jpg'
  },
  {
    id: 17,
    nombre: 'Chamarra de Mezclilla',
    descripcion: 'Chamarra clásica de mezclilla azul.',
    marca: 'DenimPro',
    precio: 54.99,
    imagen: '/img/chamarra_mezclilla.jpg'
  },
  {
    id: 18,
    nombre: 'Polo Básica',
    descripcion: 'Playera tipo polo de algodón.',
    marca: 'UrbanWear',
    precio: 21.99,
    imagen: '/img/polo_basica.jpg'
  },
  {
    id: 19,
    nombre: 'Botas de Montaña',
    descripcion: 'Botas resistentes para senderismo.',
    marca: 'MountainGear',
    precio: 79.99,
    imagen: '/img/botas_montana.jpg'
  },
  {
    id: 20,
    nombre: 'Leggings Deportivos',
    descripcion: 'Leggings elásticos para entrenamiento.',
    marca: 'ActiveFit',
    precio: 17.99,
    imagen: '/img/leggings_deportivos.jpg'
  }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
  const { nombre, descripcion, marca, precio, imagen } = req.body;
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    descripcion,
    marca,
    precio,
    imagen
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, marca, precio, imagen } = req.body;
  const producto = productos.find(p => p.id === id);
  if (producto) {
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.marca = marca;
    producto.precio = precio;
    producto.imagen = imagen;
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
    productos.splice(indice, 1);
    res.json({ mensaje: 'Producto eliminado' });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`API de productos escuchando en http://localhost:${PORT}`);
});