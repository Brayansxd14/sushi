// Importar el modelo de usuario desde el archivo de modelos
import Usuario from '../modelos/modelo_usuarios.js';
// Importar el módulo bcryptjs para manejar el hashing de contraseñas
import bcrypt from 'bcryptjs';

// Definir la función asincrónica para actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    // Extraer el ID del usuario desde los parámetros de la solicitud HTTP
    const { id } = req.params;
    // Extraer los datos de actualización desde el cuerpo de la solicitud HTTP
    const actualizaciones = req.body;
    
    // Imprimir un mensaje en la consola con los datos del intento de actualización
    console.log('Intentando actualizar usuario:', {
      id,
      actualizaciones,
      usuarioAutenticado: req.usuario // Información del usuario autenticado (si está disponible)
    });

    // Verificar que el usuario existe en la base de datos
    const usuarioExistente = await Usuario.findById(id);
    
    // Si el usuario no existe, responder con un estado 404 (no encontrado) y un mensaje de error
    if (!usuarioExistente) {
      console.log('Usuario no encontrado:', id);
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Si se actualiza la contraseña, hashearla antes de guardar
    if (actualizaciones.contraseña) {
      const salt = await bcrypt.genSalt(10);
      actualizaciones.contraseña = await bcrypt.hash(actualizaciones.contraseña, salt);
    }

    // Prevenir cambios en el rol del usuario
    delete actualizaciones.rol;

    // Actualizar el usuario en la base de datos con los datos proporcionados
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      actualizaciones,
      { 
        new: true, // Devolver el documento actualizado
        runValidators: true // Ejecutar los validadores de Mongoose en las actualizaciones
      }
    ).select('-contraseña'); // Excluir la contraseña de la respuesta

    // Responder con un estado 200 (OK) y un mensaje de éxito, incluyendo los datos del usuario actualizado
    res.status(200).json({
      exito: true,
      mensaje: 'Usuario actualizado exitosamente',
      datos: usuarioActualizado
    });

  } catch (error) {
    // Imprimir un mensaje de error en la consola si ocurre algún problema durante la actualización
    console.error('Error al actualizar usuario:', error);

    // Responder con un estado 500 (error del servidor) y un mensaje de error
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar el usuario',
      error: error.message
    });
  }
};
