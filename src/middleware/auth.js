import jwt from 'jsonwebtoken';
import Usuario from '../modelos/modelo_usuarios.js';

export const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        exito: false,
        mensaje: 'No hay token de autenticación',
        detalles: {
          headerRecibido: authHeader || 'No se recibió header de autorización'
        }
      });
    }

    // Extraer el token
    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded); // Para debugging
      
      // Buscar el usuario
      const usuario = await Usuario.findById(decoded.id).select('-contraseña');
      
      if (!usuario) {
        return res.status(401).json({
          exito: false,
          mensaje: 'Token no válido - usuario no existe',
          detalles: {
            usuarioId: decoded.id
          }
        });
      }

      // Agregar el usuario al request
      req.usuario = usuario;
      next();

    } catch (error) {
      console.log('Error al verificar token:', error);
      return res.status(401).json({
        exito: false,
        mensaje: 'Token no válido',
        detalles: error.message
      });
    }

  } catch (error) {
    console.error('Error en verificación de token:', error);
    res.status(500).json({
      exito: false,
      mensaje: 'Error en la autenticación',
      error: error.message
    });
  }
}; 