import { createBrowserRouter, RouterProvider, Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Register from './paginas/registro.jsx';
import InicioSesion from './paginas/inicio_sesion.jsx';
import ActualizarPerfil from './paginas/actualizar_perfil.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './App.css';

// Componente para proteger rutas con PropTypes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Agregar validación de PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const HomePage = () => {
  const token = localStorage.getItem('token');
  
  return (
    <div className="inicio-container">
      <h1>Bienvenido a SUSHY</h1>
      <div className="buttons-container">
        {!token ? (
          <>
            <Link to="/login" className="action-button">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="action-button">
              Registrarse
            </Link>
          </>
        ) : (
          <Link to="/perfil/actualizar" className="action-button">
            Mi Perfil
          </Link>
        )}
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/registro",
      element: <Register />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/login",
      element: <InicioSesion />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/perfil/actualizar",
      element: (
        <ProtectedRoute>
          <ActualizarPerfil />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "*",
      element: <ErrorBoundary />,
    }
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
