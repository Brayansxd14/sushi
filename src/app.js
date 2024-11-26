import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import conectarDB from './config/data.js';
import cors from 'cors';

// Importar las rutas
import clienteRutas from './rutas/clirutas.js';
import empleadoRutas from './rutas/empruta.js';
import authRutas from './rutas/iniruta.js'; 
import recuperarContrasenaRutas from './rutas/conrutas.js';
import usuarioRutas from './rutas/usuarioRutas.js';

dotenv.config();
const app = express();

// Middleware para debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Usar las rutas
app.use('/api/clientes', clienteRutas);
app.use('/api/empleados', empleadoRutas);
app.use('/api/auth', authRutas);
app.use('/api/recuperar-contrasena', recuperarContrasenaRutas);
app.use('/api/usuarios', usuarioRutas);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
