/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import './registro.css'; // Podemos reutilizar los estilos

const RegisterEmpleado = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    direccion: '',
    contraseña: '',
    rol: 'empleado'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que el correo sea de dominio fukusuke.com
      if (!formData.correoElectronico.endsWith('@fukusuke.com')) {
        setMessage({
          type: 'error',
          text: 'El correo electrónico debe terminar en @fukusuke.com'
        });
        return;
      }

      const datosParaEnviar = {
        nombreEmpleado: formData.nombre,
        correoElectronico: formData.correoElectronico,
        telefono: formData.telefono,
        direccion: formData.direccion,
        contraseña: formData.contraseña
      };

      console.log('Datos a enviar:', datosParaEnviar);

      const response = await axios.post('http://localhost:3000/api/empleados/registrar', datosParaEnviar);
      
      setMessage({ 
        type: 'success',
        text: response.data.message || 'Empleado registrado exitosamente'
      });
      
      setFormData({
        nombre: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        contraseña: '',
        rol: 'empleado'
      });
    } catch (error) {
      console.error('Error al registrar:', error);
      let errorMessage = 'Error desconocido al registrar';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Datos inválidos. Por favor verifica la información.';
            break;
          case 409:
            errorMessage = 'El correo electrónico ya está registrado.';
            break;
          case 500:
            errorMessage = 'Error en el servidor. Por favor intenta más tarde.';
            break;
          default:
            errorMessage = error.response.data.message || 'Error al procesar la solicitud.';
        }
      } else if (error.request) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      }

      setMessage({
        type: 'error',
        text: errorMessage
      });
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro de Empleado</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            placeholder="ejemplo@fukusuke.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Registrar Empleado</button>
      </form>
      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default RegisterEmpleado; 