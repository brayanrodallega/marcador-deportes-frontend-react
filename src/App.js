import { Component } from "react";
import Menu from "./components/Menu";
import MenuInicial from "./components/MenuInicial";
import PageDeportes from "./components/PageDeportes";
import PageEquipos from "./components/PageEquipos";
import PageEventos from "./components/PageEventos";
import PageInicio from "./components/PageInicio";
import PageSesion from "./components/PageSesion";
import PageUsuarios from "./components/PageUsuarios";
import PageLogin from "./components/PageLogin";
import PageLogout from "./components/PageLogout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <MenuInicial />
          <Routes>
            <Route path="/" element={<PageInicio />} />
            <Route path="/PageLogin" element={<PageLogin />} />
            <Route path="/PageLogout" element={<PageLogout />} />
          </Routes>
        </Router>

        {/* <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<PageInicio />}/>
            <Route path="/PageInicio" element={<PageInicio />}/>
            <Route path="/PageDeportes" element={<PageDeportes />}/>
            <Route path="/PageEquipos" element={<PageEquipos />}/>
            <Route path="/PageEventos" element={<PageEventos />}/>
            <Route path="/PageSesion" element={<PageSesion />}/>
            <Route path="/PageUsuarios" element={<PageUsuarios />}/>
          </Routes>
        </Router> */}
      </>
    );
  }
}

export default App;
