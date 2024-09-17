import http from '../common/http-common';
const API_URL = "laboratorio/";

const getAllLaboratorios = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const getById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const LaboratorioService = {
    getAllLaboratorios,
    getById,
}

export default LaboratorioService;