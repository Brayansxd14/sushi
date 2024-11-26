import Usuario from '../modelos/modelo_usuarios.js';

export const registrarEmpleado = async (req, res) => {
  const { nombreEmpleado, correoElectronico, telefono, direccion, contraseña, cargo } = req.body;

  try {
    // Verificar que se proporcionó un cargo
    if (!cargo) {
      return res.status(400).json({ 
        success: false,
        mensaje: 'El cargo es requerido para empleados' 
      });
    }

    // Verificar correo
    if (!correoElectronico.endsWith('@fukusuke.com')) {
      return res.status(400).json({ 
        success: false,
        mensaje: 'El correo electrónico debe terminar en @fukusuke.com' 
      });
    }

    // Verificar si ya existe
    const usuarioExistente = await Usuario.findOne({ correoElectronico });
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        mensaje: 'El correo electrónico ya está registrado' 
      });
    }

    // Crear el nuevo empleado
    const nuevoEmpleado = new Usuario({
      nombre: nombreEmpleado,
      correoElectronico,
      telefono,
      direccion,
      contraseña,
      rol: 'empleado',
      cargo // Incluir el cargo
    });

    await nuevoEmpleado.save();

    res.status(201).json({
      success: true,
      mensaje: 'Empleado registrado exitosamente',
      empleado: {
        id: nuevoEmpleado._id,
        nombre: nuevoEmpleado.nombre,
        correo: nuevoEmpleado.correoElectronico,
        rol: nuevoEmpleado.rol,
        cargo: nuevoEmpleado.cargo
      }
    });

  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ 
      success: false,
      mensaje: 'Error al registrar el empleado',
      error: error.message 
    });
  }
};
