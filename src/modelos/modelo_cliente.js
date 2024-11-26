import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const clienteSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  telefono: String,
  direccion: String
});

// Método para comparar contraseñas
clienteSchema.methods.compararContraseña = function(contraseñaCandidata, callback) {
  bcrypt.compare(contraseñaCandidata, this.contraseña, (err, esIgual) => {
    if (err) return callback(err);
    callback(null, esIgual);
  });
};

export default mongoose.model('Cliente', clienteSchema);
