// modelos/empleado.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

// Método para hashear la contraseña antes de guardar
empleadoSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

const Empleado = mongoose.model('Empleado', empleadoSchema);
export default Empleado;
