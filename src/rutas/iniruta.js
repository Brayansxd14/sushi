import { Router } from 'express';
import { loginCliente, loginEmpleado } from '../controladores/iniciosecioncliente.js';

const router = Router();

router.post('/cliente/login', loginCliente);
router.post('/empleado/login', loginEmpleado);

export default router;
