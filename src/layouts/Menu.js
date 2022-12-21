import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import Cookies from "universal-cookie";


function Menu() {

  const cookies = new Cookies();

  const cerrarSesion = () => {
    cookies.remove("usu_id", { path: "/" });
    cookies.remove("usu_nombres", { path: "/" });
    cookies.remove("usu_apellidos", { path: "/" });
    cookies.remove("usu_email", { path: "/" });
    cookies.remove("usu_clave", { path: "/" });
    window.location.href = "./";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="./logo-dark.png" alt="logo" width="50"/>
          <span> Marcadores de Deportes </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/PageInicio">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/PageUsuarios">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/PageEventos">
                Eventos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/PageDeportes">
                Deportes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/PageEquipos">
                Equipos
              </Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link" onClick={() => cerrarSesion()}>
                Salir
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
