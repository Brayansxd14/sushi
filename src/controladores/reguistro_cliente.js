// Importar el modelo de usuario desde el archivo de modelos
import Usuario from '../modelos/modelo_usuarios.js';

// Definir la función asincrónica para registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    // Extraer los datos del cliente desde el cuerpo de la solicitud HTTP
    const { nombreCliente, correoElectronico, telefono, direccion, contraseña } = req.body;

    // Imprimir un mensaje en la consola con los datos del cliente que se está registrando
    console.log('Procesando registro de cliente:', {
      nombreCliente,
      correoElectronico,
      telefono,
      direccion,
      contraseña 
    });

    // Crear una nueva instancia del modelo Usuario con los datos proporcionados
    const nuevoCliente = new Usuario({
      nombre: nombreCliente,
      correoElectronico,
      telefono,
      direccion,
      contraseña,
      rol: 'cliente' // Establecer explícitamente el rol
    });

    // Guardar la nueva instancia del cliente en la base de datos
    await nuevoCliente.save();

    // Imprimir un mensaje en la consola indicando que el cliente ha sido registrado exitosamente
    console.log('Cliente registrado exitosamente');

    // Responder con un estado 201 (creado) y un mensaje de éxito, incluyendo los datos del cliente registrado
    res.status(201).json({
      success: true,
      mensaje: 'Cliente registrado exitosamente',
      cliente: {
        id: nuevoCliente._id,
        nombre: nuevoCliente.nombre,
        correoElectronico: nuevoCliente.correoElectronico,
        rol: nuevoCliente.rol
      }
    });

  } catch (error) {
    // Imprimir un mensaje de error en la consola si ocurre algún problema durante el registro
    console.error('Error en registro:', error);

    // Mejorar el mensaje de error
    const mensajeError = error.code === 11000 
      ? 'El correo electrónico ya está registrado'
      : 'Error en el registro del cliente';

    // Responder con un estado 500 (error del servidor) y un mensaje de error
    res.status(500).json({
      success: false,
      mensaje: mensajeError,
      error: error.message
    });
  }
};
