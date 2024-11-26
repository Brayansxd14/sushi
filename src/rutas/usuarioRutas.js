import express from 'express';
import { actualizarUsuario } from '../controladores/actualizar_datos.js';
import { obtenerUsuario } from '../controladores/obtener_usuario.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Ruta para obtener datos del usuario
router.get('/obtener/:id', verificarToken, obtenerUsuario);

// Rutas de actualización
router.put('/actualizar/:id', verificarToken, actualizarUsuario);
router.put('/cliente/actualizar/:id', verificarToken, actualizarUsuario);
router.put('/:id', verificarToken, actualizarUsuario);

export default router; 