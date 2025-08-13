import axios from "axios";

const API_URL = "http://localhost:8080/usuario"; // Corrigido para endpoint base

export const cadastrarTecnico = (tecnico) => {
  return axios.post(`${API_URL}/save`, tecnico);
};

const loginTecnico = async (email, rm, senha) => {
  console.log("Tentando login com:", { email, rm, senha });
  const response = await axios.post(`${API_URL}/login`, {
    email: email,
    rm: rm,
    senha: senha,
  });

  return response.data;
};

const TecnicoService = {
  cadastrarTecnico,
  loginTecnico,
};

export default TecnicoService;
