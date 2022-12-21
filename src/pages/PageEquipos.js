import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import enpoints from "../connections/enpoints";
import { Component, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const url = enpoints.EQUIPOS;
const field_id = "equ";


class PageEquipos extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            equ_id: '',
            equ_nombre: '',
            equ_imagen: '',
        },
        tipoModal: ''
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        delete this.state.form.equ_id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + '/' + field_id + '/' + this.state.form.equ_id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete = () => {
        axios.delete(url + '/' + field_id + '/' + this.state.form.equ_id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    modalEliminar = () => {
        this.setState({ modalEliminar: !this.state.modalEliminar });
    }

    seleccionarEquipo = (equipo) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                equ_id: equipo.equ_id,
                equ_nombre: equipo.equ_nombre,
                equ_imagen: equipo.equ_imagen,
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
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {

        const form = this.state.form;
        const data = this.state.data;

        return (
            <>
                <div className="container">
                    <br />
                    <h1>Equipos</h1>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Insertar equipo</button>
                    <br /><br />
                    <div className="row ">
                        {data.map((item) => (
                            <div className="col ">
                                <Card key={item.equ_id} className="m-2 d-flex justify-content-center align-items-center" style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={item.equ_imagen} style={{ width: '200px', height: '200px' }}/>
                                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                    <Card.Title>{item.equ_nombre}</Card.Title>
                                    <Card.Text>
                                        <Button variant="primary" onClick={() => { this.seleccionarEquipo(item); this.modalInsertar() }}>Editar</Button>
                                        {"  "}
                                        <Button variant="danger" onClick={() => { this.seleccionarEquipo(item); this.modalEliminar() }}>Eliminar</Button>
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <input className="form-control" type="hidden" name="equ_id" id="equ_id" onChange={this.handleChange} value={form ? form.equ_id : ''} />
                            <br />
                            <label htmlFor="equ_nombre">Nombre</label>
                            <input className="form-control" type="text" name="equ_nombre" id="equ_nombre" onChange={this.handleChange} value={form ? form.equ_nombre : ''} />
                            <br />
                            <label htmlFor="equ_imagen">Imagen</label>
                            <input className="form-control" type="text" name="equ_imagen" id="equ_imagen" onChange={this.handleChange} value={form ? form.equ_imagen : ''} />
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
                        Estás seguro que deseas eliminar el equipo {form && form.equ_nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.modalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
                </div>
            </>
        );
    }
}

export default PageEquipos;
