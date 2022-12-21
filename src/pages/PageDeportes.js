import enpoints from "../connections/enpoints";
import axios from "axios";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = enpoints.DEPORTES;
const field_id = 'dep';


class PageDeportes extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    tipoModal: '',
    form: {
      dep_id: '',
      dep_nombre: ''
    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    });
  }

  peticionPost = async () => {
    delete this.state.form.dep_id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url+'/'+field_id + '/' + this.state.form.dep_id, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(err => {
      console.log(err.message);
    })
  }

  peticionDelete = () => {
    axios.delete(url+'/'+field_id + '/' + this.state.form.dep_id).then(response => {
      this.modalEliminar();
      this.peticionGet();
    }).catch(err => {
      console.log(err.message);
    })
  }

  seleccionarDep = (elemento) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        dep_id: elemento.dep_id,
        dep_nombre: elemento.dep_nombre
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

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  modalEliminar = () => {
    this.setState({ modalEliminar: !this.state.modalEliminar });
  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {

    const form = this.state.form;

    return (
      <>
        <div className="container ">
          <div className="row ">
            <div className="col-md-12">
              <h1>Deportes</h1>
              <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Insertar deporte</button>
              <br /><br />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((elemento) => {
                    return (
                      <tr key={elemento.dep_id}>
                        <td>{elemento.dep_id}</td>
                        <td>{elemento.dep_nombre}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => { this.seleccionarDep(elemento); this.modalInsertar() }}>Editar</button>
                          {"  "}
                          <button className="btn btn-danger" onClick={() => { this.seleccionarDep(elemento); this.modalEliminar() }}>Eliminar</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input className="form-control" type="hidden" name="dep_id" id="dep_id" onChange={this.handleChange} value={form ? form.dep_id : ''} />
              <br />
              <label htmlFor="dep_nombre">Nombre</label>
              <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value={form ? form.dep_nombre : ''} />
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
            Estás seguro que deseas eliminar el deporte {form && form.dep_nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.modalEliminar()}>No</button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default PageDeportes;