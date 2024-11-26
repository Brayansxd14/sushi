// controladores/recuperarContraseña.js
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Usuario from '../modelos/modelo_usuarios.js';
import sendEmail from '../config/nodemail.js';
import dotenv from 'dotenv';

dotenv.config();

export const forgotPassword = async (req, res) => {
  const { correoElectronico } = req.body;
  try {
    const usuario = await Usuario.findOne({ correoElectronico });
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    usuario.resetPasswordToken = token;
    usuario.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora

    console.log('Generando token:', { token, resetPasswordExpires: usuario.resetPasswordExpires });

    await usuario.save();
    console.log('Usuario actualizado con token:', usuario);

    const resetUrl = `http://localhost:5173/reset-password/${token}`;
    const message = `
      Has solicitado restablecer tu contraseña.\n\n
      Por favor haz clic en el siguiente enlace para completar el proceso:\n\n
      ${resetUrl}\n\n
      Este enlace expirará en 1 hora.\n\n
      Si no solicitaste esto, por favor ignora este correo.\n
    `;

    await sendEmail(usuario.correoElectronico, 'Restablecer Contraseña', message);
    res.status(200).json({ 
      success: true,
      message: 'Se ha enviado un enlace de recuperación a tu correo electrónico',
      token: token // Añadiendo el token aquí para depuración
    });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ success: false, message: 'Error al procesar la solicitud', error: error.message });
  }
};


export const verificarToken = async (req, res) => {
  const { token } = req.params;

  try {
    console.log('Token recibido:', token);

    const usuario = await Usuario.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    console.log('Resultado de la búsqueda de usuario:', usuario);

    if (!usuario) {
      console.log('Token inválido o caducado');
      return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
    }

    res.json({ success: true, message: 'Token válido' });
  } catch (error) {
    console.error('Error al verificar token:', error);
    res.status(500).json({ success: false, message: 'Error al verificar token', error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { contraseña } = req.body;

    console.log('Recibido:', { token, contraseña });

    const usuario = await Usuario.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    console.log('Usuario encontrado:', usuario);

    if (!usuario) {
      console.log('Token inválido o caducado');
      return res.status(400).json({ success: false, message: 'El enlace de recuperación es inválido o ha expirado' });
    }

    if (!contraseña || contraseña.length < 6) {
      return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    usuario.contraseña = contraseña; // El middleware pre-save se encargará de hashear
    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpires = undefined;

    await usuario.save();

    console.log('Contraseña actualizada para usuario:', usuario);

    res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error completo en resetPassword:', error);
    res.status(500).json({ success: false, message: 'Error al restablecer la contraseña', error: error.message });
  }
};
