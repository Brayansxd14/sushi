// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const respuesta = await axios.post('http://localhost:5001/api/auth/cliente/iniciar-sesion', {
        correoElectronico,
        contraseña
      });
      setMensaje('Inicio de sesión exitoso');
      console.log(respuesta.data); // Agrega esto para usar la variable respuesta
    } catch (error) {
      setMensaje(error.response.data.message || 'Error al iniciar sesión');
    }
  };

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: 'auto',
  };

  const h1Style = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const mensajeStyle = {
    textAlign: 'center',
    marginTop: '20px',
    color: 'red',
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <div style={inputGroupStyle}>
          <label htmlFor="correoElectronico" style={labelStyle}>Correo Electrónico</label>
          <input type="email" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="contraseña" style={labelStyle}>Contraseña</label>
          <input type="password" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>Iniciar Sesión</button>
      </form>
      <div style={mensajeStyle}>{mensaje}</div>
    </div>
  );
}

export default Login;
