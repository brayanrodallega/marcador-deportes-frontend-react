import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'

class MenuInicial extends Component {

  state={
    estaLogin: false
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="./logo.png" alt="logo" width={50} height={40}/>
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
              <li className="nav-item" hidden={this.state.estaLogin}>
                <Link className="nav-link" to="/PageLogin">
                  Login
                </Link>
              </li>
              <li className="nav-item" hidden={!this.state.estaLogin}>
                <Link className="nav-link" to="/PageLogout">
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default MenuInicial;