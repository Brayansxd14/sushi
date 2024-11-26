import express from 'express';
import { registrarCliente } from '../controladores/reguistro_cliente.js';

const router = express.Router();

// Agregar un console.log para debug
router.post('/registrar', (req, res, next) => {
  console.log('Recibida petición de registro:', {
    body: req.body,
    method: req.method,
    url: req.url
  });
  next();
}, registrarCliente);

export default router;
