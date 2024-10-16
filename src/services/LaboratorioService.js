import http from '../common/http-common';
const API_URL = "http://localhost:8080/laboratorio";

const getAllLaboratorios = () => {
    return http.mainInstance.get(API_URL); // Removido 'findAll'
};

const getById = (id) => {
    return http.mainInstance.get(API_URL + `/${id}`); // Corrigido para usar apenas ID
};

const LaboratorioService = {
    getAllLaboratorios,
    getById,
}

export default LaboratorioService;
