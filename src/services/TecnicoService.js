import axios from "axios";

const API_URL = "http://localhost:8080/api/tecnicos"; // Corrigido para incluir /api

const cadastrarTecnico = (tecnico) => {
  return axios.post(API_URL, tecnico);
};

const loginTecnico = async (email, senha) => {
  const response = await axios.post(`${API_URL}/login`, {
    rmtecnico: email,
    senha: senha,
  });

  return response.data;
};

const TecnicoService = {
  cadastrarTecnico,
  loginTecnico,
};

export default TecnicoService;
