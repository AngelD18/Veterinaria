import React, { Component } from 'react';
import Header from './Header'
import AgregarCita from './AgregarCita'
import ListaCitas from './ListaCitas';

class App extends Component {
  state = {
    citas: {}
  }
  componentDidMount() {
    const citasLS = localStorage.getItem('citas');
    if (citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }
  componentDidUpdate() {
    localStorage.setItem(
      'citas',
      JSON.stringify(this.state.citas)
    )
  }
  crearCita = (infoCitas) => {
    //tomar una copia del state
    const citas = { ...this.state.citas }
    //Agregar al state actual
    citas[`citas${Date.now()}`] = infoCitas;
    //Set al state
    this.setState({
      citas
    })
  }
  borrarCita = (id) => {
    //console.log("Eliminando... " + id);
    //Leer el State
    const citas = { ...this.state.citas }
    //borrar del state
    delete citas[id];
    console.log(citas)
    //actualizar el state
    this.setState({
      citas
    })
  }
  render() {
    return (
      <div className="container">
        <Header
          titulo="Administrador de Pacientes de Veterinaria"
        />
        <div className="row">
          <div className="col-md-6">
            <AgregarCita
              crearCita={this.crearCita}
            />

          </div>
          <div className="col-md-6">
            <ListaCitas
              citas={this.state.citas}
              borrarCita={this.borrarCita}

            />

          </div>

        </div>
      </div>
    );
  }
}

export default App;
