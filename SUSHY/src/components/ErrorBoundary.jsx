import { useRouteError, Link } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h2>¡Ups! Algo salió mal</h2>
      <p>
        {error ? (
          error.message || 'Ha ocurrido un error inesperado'
        ) : (
          'Ha ocurrido un error inesperado'
        )}
      </p>
      <Link to="/">
        <button className="error-button">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}

export default ErrorBoundary; 