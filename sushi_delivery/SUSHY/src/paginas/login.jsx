/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function InicioSesion() {
    const manejarEnvio = (e) => {
        e.preventDefault();
        const usuario = e.target.usuario.value;
        const contraseña = e.target.contraseña.value;
        const rol = e.target.rol.value;
        console.log('Usuario:', usuario, 'Contraseña:', contraseña, 'Rol:', rol);
    };

    return (
        <div
            style={{
                background: 'linear-gradient(to bottom, #ffcc66, #ff9966)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className="bg-gray-100 p-6 rounded-lg shadow-lg"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    width: '300px',
                    textAlign: 'center'
                }}
            >
                <h1 className="text-2xl font-bold mb-4">Inicio de Sesión</h1>
                <form onSubmit={manejarEnvio} className="w-full border-gray-400 text-black px-4 py-2 rounded-md my-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Usuario:
                        <input
                            type="text"
                            name="usuario"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                            placeholder="Nombre de usuario"
                        />
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña:
                        <input
                            type="password"
                            name="contraseña"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                            placeholder="Contraseña"
                        />
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rol:
                        <select
                            name="rol"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                        >
                            <option value="cliente">Cliente</option>
                            <option value="empleado">Empleado</option>
                        </select>
                    </label>
                    <button type="submit" className="bg-slate-600 text-white p-2 rounded-md mt-4 hover:bg-red-500 transition duration-200">
                        Iniciar Sesión
                    </button>
                </form>
                <div className="mt-4">
                    <Link to="/olvide-contrasena" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;
