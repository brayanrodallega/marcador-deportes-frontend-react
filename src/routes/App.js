import Menu from "../layouts/Menu";
import MenuInicial from "../layouts/MenuInicial";
import PageDeportes from "../pages/PageDeportes";
import PageEquipos from "../pages/PageEquipos";
import PageEventos from "../pages/PageEventos";
import PageInicio from "../pages/PageInicio";
import PageSesion from "../pages/PageSesion";
import PageUsuarios from "../pages/PageUsuarios";
import PageLogin from "../pages/PageLogin";
import PageLogout from "../pages/PageLogout";
import PageRegistro from "../pages/PageRegistro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";


const cookies = new Cookies();


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookies.get("usu_id")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <div className="App">
      {isLoggedIn ? ( // isLoggedIn = true
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<PageInicio />} />
            <Route path="/PageInicio" element={<PageInicio />} />
            <Route path="/PageDeportes" element={<PageDeportes />} />
            <Route path="/PageEquipos" element={<PageEquipos />} />
            <Route path="/PageEventos" element={<PageEventos />} />
            <Route path="/PageSesion" element={<PageSesion />} />
            <Route path="/PageUsuarios" element={<PageUsuarios />} />
          </Routes>
        </Router>
      ) : ( // isLoggedIn = false 
        <Router>
          <MenuInicial />
          <Routes>
            <Route path="/" element={<PageInicio />} />
            <Route path="/PageLogin" element={<PageLogin />} />
            <Route path="/PageRegistro" element={<PageRegistro />} />
            <Route path="/PageLogout" element={<PageLogout />} />
          </Routes>
        </Router>
      )}
    </div>
    
  );
}

export default App;
