import React from "react";
import "../css/PageRegistro.css"
import axios from "axios";

const enpoints = require('../connections/enpoints');
const url = enpoints.USUARIOS;


function PageRegistro() {

    const [form, setForm] = React.useState({
        usu_nombres: '',
        usu_apellidos: '',
        usu_email: '',
        usu_clave: ''
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
        console.log(form);
    }

    const peticionPost = async () => {
        await axios.post(url, form).then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    
    return (
        <div className="login">
        <div className="form-container">
            <h1 className="title">My account</h1>
            <form action="/" className="form">
            <div>
                <label htmlFor="name" className="label">
                Name
                </label>
                <input
                type="text"
                id="name"
                placeholder="Brayan"
                className="input input-name"
                name="usu_nombres"
                onChange={handleChange}
                />
    
                <label htmlFor="last-name" className="label">
                Last name
                </label>
                <input
                type="text"
                id="last-name"
                placeholder="Rodallega"
                className="input input-last-name"
                name="usu_apellidos"
                onChange={handleChange}
                />
    
                <label htmlFor="email" className="label">
                Email
                </label>
                <input
                type="text"
                id="email"
                placeholder="brayan@gmail.com"
                className="input input-email"
                name="usu_email"
                onChange={handleChange}
                />

                <label htmlFor="password" className="label">
                Password
                </label>
                <input
                type="password"
                id="password"
                placeholder="*********"
                className="input input-password"
                name="usu_clave"
                onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Create"
                className="primary-button login-button"
                onClick={() => peticionPost()}
            />
            </form>
        </div>
        </div>
    );
}

export default PageRegistro;
