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

// Verificar duplicidade de laboratório pelo nome
const verificarDuplicidade = (nome) => {
    return http.mainInstance.get(`${API_URL}/verificar-duplicidade?nome=${encodeURIComponent(nome)}`);
};

const LaboratorioService = {
    getAllLaboratorios,
    getById,
    saveLaboratorio,
    update: updateLaboratorio,
    deleteLaboratorio,
    verificarDuplicidade,
};

export default LaboratorioService;
