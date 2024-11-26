// Importar el modelo de usuario desde el archivo de modelos
import Usuario from '../modelos/modelo_usuarios.js';
// Importar el paquete jsonwebtoken para manejar la creación y verificación de tokens JWT
import jwt from 'jsonwebtoken';

// Función asincrónica para manejar el inicio de sesión de usuarios con un rol específico
const iniciarSesion = async (req, res, rolEsperado) => {
  try {
    // Extraer el correo electrónico y la contraseña desde el cuerpo de la solicitud HTTP
    const { correoElectronico, contraseña } = req.body;

    // Imprimir un mensaje en la consola con los datos del intento de inicio de sesión
    console.log('Intento de login:', {
      correo: correoElectronico,
      tieneContraseña: !!contraseña // Verificar si se proporcionó una contraseña
    });

    // Buscar en la base de datos un usuario con el correo electrónico y el rol esperado
    const usuario = await Usuario.findOne({ correoElectronico, rol: rolEsperado });

    // Si no se encuentra el usuario, responder con un estado 401 (no autorizado) y un mensaje de error
    if (!usuario) {
      console.log('Usuario no encontrado:', { correo: correoElectronico, rol: rolEsperado });
      return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas' });
    }

    // Imprimir un mensaje en la consola con los datos del usuario encontrado
    console.log('Usuario encontrado:', { id: usuario._id, correo: usuario.correoElectronico });

    // Verificar si la contraseña proporcionada coincide con la contraseña guardada
    const coincide = await usuario.compararContraseña(contraseña);
    console.log('Comparación de contraseñas:', { coincide });

    // Si la contraseña no coincide, responder con un estado 401 (no autorizado) y un mensaje de error
    if (!coincide) {
      console.log('Contraseña incorrecta para usuario:', { id: usuario._id });
      return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas' });
    }

    // Imprimir un mensaje en la consola indicando que la contraseña es correcta
    console.log('Contraseña correcta');

    // Crear un token JWT con los datos del usuario
    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correoElectronico,
        rol: usuario.rol
      },
      process.env.JWT_SECRET || 'claveSecreta', // Usar una clave secreta desde las variables de entorno o una clave por defecto
      { expiresIn: '8h' } // Configurar la expiración del token a 8 horas
    );

    // Imprimir el token generado en la consola
    console.log('Token generado:', token);

    // Responder con un estado 200 (OK) y un mensaje de éxito, incluyendo los datos del usuario y el token
    res.status(200).json({
      success: true,
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario._id,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.rol
      },
      token
    });

  } catch (error) {
    // Imprimir un mensaje de error en la consola si ocurre algún problema durante el inicio de sesión
    console.error('Error en login:', error);

    // Responder con un estado 500 (error del servidor) y un mensaje de error
    res.status(500).json({ success: false, mensaje: 'Error en el servidor', error: error.message });
  }
};

// Exportar las funciones para manejar el inicio de sesión de clientes y empleados
export const loginCliente = (req, res) => iniciarSesion(req, res, 'cliente');
export const loginEmpleado = (req, res) => iniciarSesion(req, res, 'empleado');
