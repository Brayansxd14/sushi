
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroClientes() {
    const navigate = useNavigate();

    const manejarEnvio = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const correo = e.target.correo.value;
        const contraseña = e.target.contraseña.value;
        console.log('Nombre:', nombre, 'Correo:', correo, 'Contraseña:', contraseña);
        
       
        setTimeout(() => {
            navigate('/validacion-correo');
        }, 1000);
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
                <h1 className="text-2xl font-bold mb-4">Registro de Clientes</h1>
                <form onSubmit={manejarEnvio} className="w-full border-gray-400 text-black px-4 py-2 rounded-md my-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                            placeholder="Nombre completo"
                        />
                    </label>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico:
                        <input
                            type="email"
                            name="correo"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                            placeholder="Correo electrónico"
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
                    <button type="submit" className="bg-slate-600 text-white p-2 rounded-md mt-4 hover:bg-red-500 transition duration-200">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistroClientes;
