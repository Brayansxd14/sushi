import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InicioSesion from './paginas/login';
import RegistroClientes from './paginas/registro';
import OlvideContrasena from './paginas/contraceña';
import ValidacionCorreo from './paginas/autenticacion';
function Home() {
    return (
        <div style={{
            background: 'linear-gradient(to bottom, #ffcc66, #ff9966)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h1 style={{ 
                color: '#fff', 
                marginBottom: '20px', 
                padding: '10px 20px', 
                border: '2px solid #fff', 
                borderRadius: '5px',
                backgroundColor: 'rgba(0, 123, 255, 0.7)', 
            }}>Bienvenido a la aplicación de gestión</h1>
            <nav>  
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    gap: '10px'
                }}>
                    
                    <li><a href="/inicio-sesion" style={linkStyle}>Inicio de Sesión</a></li>
                    <li><a href="/registro-cliente" style={linkStyle}>Registro Cliente</a></li>
                    <li><a href="/Validacion" style={linkStyle}>Valiadar</a></li>
                </ul>
            </nav>
        </div>
    );
}

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'rgba(0, 123, 255, 0.7)',
    padding: '10px 20px',
    borderRadius: '5px',
    border: '2px solid #fff',
    transition: 'background-color 0.2s',
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/inicio-sesion" element={<InicioSesion />} /> 
                <Route path="/registro-cliente" element={<RegistroClientes />} /> 
                <Route path="/olvide-contrasena" element={<OlvideContrasena />} /> 
                <Route path="/Validacioncorreo" element={<ValidacionCorreo />} /> 
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
