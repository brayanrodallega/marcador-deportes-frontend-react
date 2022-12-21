import React, { Component } from "react";
import enpoints from "../connections/enpoints";

import "../css/PageLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const urlLogin = enpoints.USUARIOS;

class PageLogin extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  iniciarSesion = async () => {
    let name = this.state.form.username;
    let pass = this.state.form.password;
    if (name.length <= 0 || pass.length <= 0) {
      alert("Ingrese su usuario y contraseña");
      return "Datos vacios";
    }

    await axios
      .get(urlLogin + "/" + name + "/" + pass)
      .then((response) => {
        console.log(urlLogin + "/" + name + "/" + pass);
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          let respuesta = response[0];
          cookies.set("usu_id", respuesta.usu_id, { path: "/" });
          cookies.set("usu_nombres", respuesta.usu_nombres, { path: "/" });
          cookies.set("usu_apellidos", respuesta.usu_apellidos, { path: "/" });
          cookies.set("usu_email", respuesta.usu_email, { path: "/" });
          cookies.set("usu_clave", respuesta.usu_clave, { path: "/" });
          // cookies.set('usu_rol', respuesta.usu_rol, {path: '/'});
          alert(
            "Bienvenido " +
              respuesta.usu_nombres +
              " " +
              respuesta.usu_apellidos
          );
          window.location.href = "./";
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="login">
        <div className="form-container">
          <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />

          <form action="/" className="form">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="username"
              value={this.state.form.username}
              placeholder="brayan@example.com"
              className="input input-email"
              onChange={this.handleChange}
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.form.password}
              placeholder="*********"
              className="input input-password"
              onChange={this.handleChange}
            />

            <input
              type="submit"
              value="Log in"
              className="primary-button login-button" onClick={() => {
                this.iniciarSesion()
              }}
            />

            <a href="/">Forgot my password</a>
          </form>

          <button className="secondary-button signup-button">Sign up</button>
        </div>
      </div>
    );
  }
}

export default PageLogin;
