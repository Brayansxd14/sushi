/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/usuarios/registrar', formData);
      alert(res.data.message);
    } catch (error) {
      alert('Error al registrar');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombreUsuario"
          placeholder="Nombre de usuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Registrar</button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(to bottom, #ffcc66, #ff9966)',
};

const titleStyle = {
  color: '#fff',
  marginBottom: '20px',
  padding: '10px 20px',
  border: '2px solid #fff',
  borderRadius: '5px',
  backgroundColor: 'rgba(0, 123, 255, 0.7)',
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
  border: '2px solid #fff',
  width: '200px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: '2px solid #fff',
  backgroundColor: 'rgba(0, 123, 255, 0.7)',
  color: '#fff',
  cursor: 'pointer',
};

export default Registro;
