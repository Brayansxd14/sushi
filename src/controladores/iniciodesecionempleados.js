import Empleado from "../modelos/modelo_empleado.js";

const iniciarSesionEmpleado = async (req, res) => {
  try {
    const { correoElectronico, contraseña } = req.body;
    const empleado = await Empleado.findOne({ correoElectronico });

    if (!empleado) {
      return res.status(400).json({ mensaje: 'Empleado no encontrado' });
    }

    // Usar la función compararContraseña
    empleado.compararContraseña(contraseña, (err, esIgual) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }

      if (!esIgual) {
        return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
      }

      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error al iniciar sesión del empleado: ${error.message}` });
  }
};

export { iniciarSesionEmpleado };
