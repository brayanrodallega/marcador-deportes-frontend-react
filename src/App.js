// import logo from './logo.svg';
import "./App.css";
import { Component } from "react";
import Saludar from "./components/Saludar"
import Usuario from "./components/Usuario"
import Civil from "./components/Civil"

class App extends Component {
  render() {
    return (
      <>
        <Saludar></Saludar>
        <Usuario></Usuario>
        {Civil(false)}
      </>
    );
  }
}

export default App;
