/* eslint-disable no-unused-vars */
import React from 'react';

function ValidacionCorreo() {
    const manejarEnvio = (e) => {
        e.preventDefault();
        const codigo = e.target.codigo.value;
        console.log('Código de validación:', codigo);
    };

    return (
        <div
            style={{
                background: 'linear-gradient(to bottom, #ffcc66, #ff9966)', // Fondo naranja degradado
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
                <h1 className="text-2xl font-bold mb-4">Validar Correo Electrónico</h1>
                <form onSubmit={manejarEnvio} className="w-full border-gray-400 text-black px-4 py-2 rounded-md my-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código de Validación:
                        <input
                            type="text"
                            name="codigo"
                            required
                            className="mt-1 bg-amber-100 text-slate-600 p-2 rounded-md w-full"
                            placeholder="Introduce el código de validación"
                        />
                    </label>
                    <button type="submit" className="bg-slate-600 text-white p-2 rounded-md mt-4 hover:bg-red-500 transition duration-200">
                        Validar Código
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ValidacionCorreo;




