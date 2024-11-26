import { Link } from 'react-router-dom';
import './seleccion_registro.css';

const SeleccionRegistro = () => {
  return (
    <div className="seleccion-container">
      <h1>Bienvenido a Fukusuke</h1>
      <div className="botones-container">
        <Link to="/login">
          <button 
            className="boton-registro cliente"
          >
            <i className="fas fa-user"></i>
            <span>Registro de Cliente</span>
            <p>Para clientes que desean ordenar</p>
          </button>
        </Link>

        <Link to="/registro/empleado">
          <button 
            className="boton-registro empleado"
          >
            <i className="fas fa-id-card"></i>
            <span>Registro de Empleado</span>
            <p>Solo para personal autorizado</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SeleccionRegistro; 