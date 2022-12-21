import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import enpoints from "../connections/enpoints";


const TableEventos = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axios.get(enpoints.LISTAR_5_EVENTOS)
            .then(res => {
                setEventos(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Eventos recientes</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Equipo 1</th>
                        <th>Marcador</th>
                        <th>Equipo 2</th>
                        <th>Deporte</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento, index) => (
                        <tr key={index}>
                            <td>{evento.fecha}</td>
                            <td>{evento.equi1}</td>
                            <td>{evento.marca1 + " - " + evento.marca2}</td>
                            <td>{evento.equi2}</td>
                            <td>{evento.deporte}</td>
                            <td>{evento.descrip}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}


export default TableEventos;