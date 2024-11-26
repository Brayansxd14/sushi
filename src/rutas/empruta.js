import { Router } from 'express';
import { registrarEmpleado } from '../controladores/reguistro_empleado.js';

const router = Router();

router.post('/registrar', registrarEmpleado);

export default router;
