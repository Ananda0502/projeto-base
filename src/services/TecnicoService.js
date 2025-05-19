import axios from "axios";

const API_URL = "http://localhost:8080/tecnicos"; // ajuste se seu backend estiver rodando em outra porta

const cadastrarTecnico = (tecnico) => {
  return axios.post(API_URL, tecnico);
};

const TecnicoService = {
  cadastrarTecnico,
};

export default TecnicoService;
