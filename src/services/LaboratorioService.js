import http from '../common/http-common';
const API_URL = "http://localhost:8080/laboratorio";

const getAllLaboratorios = () => {
    return http.mainInstance.get(API_URL);
};

const getById = (id) => {
    return http.mainInstance.get(`${API_URL}/findById/${id}`);
};

const saveLaboratorio = (laboratorio) => {
    return http.mainInstance.post(API_URL, laboratorio); // Método POST para salvar novo laboratório
};

const LaboratorioService = {
    getAllLaboratorios,
    getById,
    saveLaboratorio, // Adicionando o novo método aqui
};

export default LaboratorioService;
