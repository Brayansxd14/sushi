import Usuario from '../modelos/modelo_usuarios.js';

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const usuario = await Usuario.findById(id).select('-contraseña');
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      mensaje: 'Usuario encontrado exitosamente',
      usuario: {
        nombre: usuario.nombre,
        correoElectronico: usuario.correoElectronico,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        rol: usuario.rol,
        cargo: usuario.cargo // Solo se incluirá si existe
      }
    });

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener datos del usuario',
      error: error.message
    });
  }
}; 