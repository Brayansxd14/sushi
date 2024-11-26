/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './registro.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    direccion: '',
    contraseña: ''
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
      const datosParaEnviar = {
        nombreCliente: formData.nombre,
        correoElectronico: formData.correoElectronico,
        telefono: formData.telefono,
        direccion: formData.direccion,
        contraseña: formData.contraseña
      };

      console.log('Datos a enviar:', datosParaEnviar);

      const response = await axios.post(
        'http://localhost:3000/api/clientes/registrar',
        datosParaEnviar,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Respuesta:', response.data);

      setMessage({ 
        type: 'success',
        text: 'Registro exitoso! Ya puedes iniciar sesión.'
      });
      
      setFormData({
        nombre: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        contraseña: ''
      });
    } catch (error) {
      console.error('Error detallado:', error.response?.data);
      setMessage({
        type: 'error',
        text: error.response?.data?.mensaje || 'Error al registrar usuario'
      });
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro de Cliente</h2>
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

        <button type="submit" className="submit-btn">Registrarse</button>

        <div className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
        </div>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Register;

