/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './inicio_sesion.css';

const InicioSesion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correoElectronico: '',
    contraseña: ''
  });
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Intentando iniciar sesión con:', formData);
      
      const endpoint = tipoUsuario === 'cliente' 
        ? 'http://localhost:3000/api/auth/cliente/login'
        : 'http://localhost:3000/api/auth/empleado/login';

      const response = await axios.post(endpoint, formData);
      console.log('Respuesta del servidor:', response.data);

      if (response.data.success) {
        // Guardar datos en localStorage con la nueva estructura
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.usuario.id);
        localStorage.setItem('userRole', tipoUsuario);
        
        setMessage({
          type: 'success',
          text: 'Inicio de sesión exitoso. Redirigiendo...'
        });

        // Redirigir inmediatamente al formulario de actualización
        navigate('/perfil/actualizar');
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.mensaje || 'Error al iniciar sesión'
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      <div className="tipo-usuario-selector">
        <button 
          type="button"
          className={`selector-btn ${tipoUsuario === 'cliente' ? 'active' : ''}`}
          onClick={() => setTipoUsuario('cliente')}
        >
          Cliente
        </button>
        <button 
          type="button"
          className={`selector-btn ${tipoUsuario === 'empleado' ? 'active' : ''}`}
          onClick={() => setTipoUsuario('empleado')}
        >
          Empleado
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            id="correoElectronico"
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            placeholder={tipoUsuario === 'empleado' ? 'ejemplo@fukusuke.com' : 'tu@email.com'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            id="contraseña"
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Iniciar Sesión
        </button>

        <div className="links-container">
          <Link to="/recuperar-contrasena" className="auth-link">
            ¿Olvidaste tu contraseña?
          </Link>
          {tipoUsuario === 'cliente' && (
            <Link to="/registro" className="auth-link">
              ¿No tienes cuenta? Regístrate
            </Link>
          )}
        </div>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default InicioSesion; 