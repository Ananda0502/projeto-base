import http from '../common/http-common';

const API_URL = "http://localhost:8080/localidade";

// Buscar todos os laboratórios
const getAllLaboratorios = () => {
    return http.mainInstance.get(API_URL);
};

// Buscar laboratório por ID
const getById = (id) => {
    return http.mainInstance.get(`${API_URL}/${id}`);
};

// Salvar novo laboratório
const saveLaboratorio = (laboratorio) => {
    // laboratorio deve ter a estrutura { nome, andar, sala, ativo? }
    return http.mainInstance.post(API_URL, laboratorio);
};

// Atualizar laboratório
const updateLaboratorio = (id, laboratorio) => {
    return http.mainInstance.put(`${API_URL}/${id}`, laboratorio);
};

// Excluir laboratório
const deleteLaboratorio = (id) => {
    return http.mainInstance.delete(`${API_URL}/${id}`);
};

const LaboratorioService = {
    getAllLaboratorios,
    getById,
    saveLaboratorio,
    update: updateLaboratorio,
    deleteLaboratorio,
};

export default LaboratorioService;
