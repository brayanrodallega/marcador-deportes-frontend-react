// Description: Endpoints de la API
const API = "http://localhost:9000/api";

// Endpoints evntos
const LISTAR_5_EVENTOS = `${API}/eventos/5`;
const EVENTOS_ALL = `${API}/eventos/ALL`;
const EVENTOS = `${API}/eventos`;

// Endpoints usuarios
const USUARIOS = `${API}/usuarios`;

// Endpoints equipos
const EQUIPOS = `${API}/equipos`;

// Endpoints deportes
const DEPORTES = `${API}/deportes`;


// Export Endpoints para ser usados en otros archivos
module.exports = {LISTAR_5_EVENTOS, EVENTOS, EVENTOS_ALL, USUARIOS, EQUIPOS, DEPORTES};