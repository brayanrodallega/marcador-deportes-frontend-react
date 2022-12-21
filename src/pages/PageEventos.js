import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PageEventos.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { Component } from "react";


const enpoints = require('../connections/enpoints');
const fieldid = 'eve'

class PageEventos extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        form: {
            eve_id: '',
            eve_fecha: '',
            equ_equipo1: '',
            equ_equipo2: '',
            eve_marca1: '',
            eve_marca2: '',
            dep_id: '',
            eve_descrip: '',
        }
    };

    peticionGet = () => {
        axios.get(enpoints.EVENTOS_ALL).then((response) => {
            //console.log(response.data);
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.message)
            })
    };

    peticionPost = async () => {
        delete this.state.form.eve_id
        await axios.post(enpoints.EVENTOS, this.state.form).then((response) => {
            this.modalInsertar() //cerramos la modal form
            this.peticionGet()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionPut = () => {
        console.log(enpoints.EVENTOS + '/' + fieldid + '/' + this.state.form.eve_id)
        axios.put(enpoints.EVENTOS + '/' + fieldid + '/' + this.state.form.eve_id, this.state.form)
            .then((response) => {
                this.modalInsertar() //cerramos la modal form
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    peticionDelete = () => {
        axios.delete(enpoints.EVENTOS + '/' + fieldid + '/' + this.state.form.eve_id)
            .then((response) => {
                this.setState({ modalEliminar: false })
                this.peticionGet()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar })
    }   

    seleccionarEvento = (evento) => {

        this.setState({
            tipoModal: 'actualizar',
            form: {
                eve_id: evento.sec,
                eve_fecha: evento.fecha,
                equ_equipo1: evento.equi1,
                equ_equipo2: evento.equi2,
                eve_marca1: evento.marca1,
                eve_marca2: evento.marca2,
                dep_id: evento.deporte,
                eve_descrip: evento.descrip
            }
        })
    }


    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (
            <>
                <h1>Eventos</h1>
                <br />
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Registrar evento</button>
                <br /><br />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Equipo 1</th>
                            <th>Marcador</th>
                            <th>Equipo 2</th>
                            <th>Deporte</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((evento) => {
                            return (
                                <tr key={evento.sec}>
                                    <td>{evento.fecha}</td>
                                    <td>{evento.equi1}</td>
                                    <td>{evento.marca1} - {evento.marca2}</td>
                                    <td>{evento.equi2}</td>
                                    <td>{evento.deporte}</td>
                                    <td>{evento.descrip}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarEvento(evento); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarEvento(evento); this.modalEliminar() }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                    
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="eve_fecha">Fecha</label>
                            <input className="form-control" type="date" name="eve_fecha" id="eve_fecha" onChange={this.handleChange} value={form ? form.eve_fecha : ''} />
                            <br />
                            <label htmlFor="equ_equipo1">Equipo 1</label>
                            <input className="form-control" type="text" name="equ_equipo1" id="equ_equipo1" onChange={this.handleChange} value={form ? form.equ_equipo1 : ''} />
                            <br />
                            <label htmlFor="eve_marca1">Marcador 1</label>
                            <input className="form-control" type="text" name="eve_marca1" id="eve_marca1" onChange={this.handleChange} value={form ? form.eve_marca1 : ''} />
                            <br />
                            <label htmlFor="equ_equipo2">Equipo 2</label>
                            <input className="form-control" type="text" name="equ_equipo2" id="equ_equipo2" onChange={this.handleChange} value={form ? form.equ_equipo2 : ''} />
                            <br />
                            <label htmlFor="eve_marca2">Marcador 2</label>
                            <input className="form-control" type="text" name="eve_marca2" id="eve_marca2" onChange={this.handleChange} value={form ? form.eve_marca2 : ''} />
                            <br />
                            <label htmlFor="dep_id">Deporte</label>
                            <input className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange} value={form ? form.dep_id : ''} />
                            <br />
                            <label htmlFor="eve_descrip">Descripción</label>
                            <input className="form-control" type="text" name="eve_descrip" id="eve_descrip" onChange={this.handleChange} value={form ? form.eve_descrip : ''} />
                            <br />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar el evento {form && form.eve_fecha}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}


export default PageEventos;