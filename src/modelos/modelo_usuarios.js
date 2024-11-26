import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición del esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    validate: {
      validator: function() {
        if (this.rol === 'empleado') {
          return this.cargo != null;
        }
        return true;
      },
      message: 'El cargo es requerido para empleados'
    }
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    enum: ['cliente', 'empleado'],
    default: 'cliente'
  }
});

// Método para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas usando promesas
usuarioSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

// Creación del modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
