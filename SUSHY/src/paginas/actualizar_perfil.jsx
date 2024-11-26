/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './actualizar_perfil.css';

const ActualizarPerfil = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    telefono: '',
    direccion: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/usuarios/obtener/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setFormData({
            nombre: response.data.usuario.nombre || '',
            correoElectronico: response.data.usuario.correoElectronico || '',
            telefono: response.data.usuario.telefono || '',
            direccion: response.data.usuario.direccion || ''
          });
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.mensaje || 'Error al cargar los datos'
        });
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatosUsuario();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.put(
        `http://localhost:3000/api/usuarios/actualizar/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setMessage({
          type: 'success',
          text: '¡Datos actualizados exitosamente!'
        });
        
        setTimeout(() => {
          setShowForm(false);
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.mensaje || 'Error al actualizar los datos'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVolver = () => {
    navigate('/');
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="success-container">
        <h2>¡Perfil Actualizado!</h2>
        <p>Tus datos han sido actualizados correctamente.</p>
        <div className="button-group">
          <button 
            className="action-btn primary"
            onClick={() => setShowForm(true)}
          >
            Actualizar Nuevamente
          </button>
          <button 
            className="action-btn secondary"
            onClick={handleVolver}
          >
            Volver al Inicio
          </button>
          <button 
            className="action-btn danger"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="actualizar-container">
      <div className="header-buttons">
        <button 
          className="back-btn"
          onClick={handleVolver}
        >
          ← Volver
        </button>
        <button 
          className="logout-btn"
          onClick={handleCerrarSesion}
        >
          Cerrar Sesión
        </button>
      </div>

      <h2>Actualizar Perfil</h2>
      
      <form onSubmit={handleSubmit} className="actualizar-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={isUpdating}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            id="correoElectronico"
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            disabled={isUpdating}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={isUpdating}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            id="direccion"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={isUpdating}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isUpdating ? 'updating' : ''}`}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <span className="loader-button"></span>
              Actualizando...
            </>
          ) : 'Actualizar Datos'}
        </button>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ActualizarPerfil; 