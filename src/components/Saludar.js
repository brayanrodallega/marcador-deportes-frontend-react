import React from "react";

function Saludar() {

  function Sumar(x, y) {
    return x + y;
  }

  return (
    <>
      <h1>Hola Mundo</h1>
      <h2>Mi primer REACT</h2>
      <table border={1}>
        <tr>
          <td>Inicio</td>
          <td>Nombre</td>
        </tr>
      </table>
      <h2>La suma es {Sumar(2, 60)}</h2>
    </>
  );
}

export default Saludar;