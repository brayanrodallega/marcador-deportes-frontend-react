import React from "react";

function Usuario() {
  const user = {
    name: "Brayan",
    lastname: "Rodallega",
  };

  // return <h2>{JSON.stringify(user)}</h2>
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.lastname}</p>
    </div>
  );
}

export default Usuario;
