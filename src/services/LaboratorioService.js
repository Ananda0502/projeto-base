import http from '../common/http-common';

const API_URL = "http://localhost:8080/laboratorio";

// Método para buscar todos os laboratórios
const getAllLaboratorios = () => {
    return http.mainInstance.get(API_URL);
};

// Método para buscar um laboratório por ID
const getById = (id) => {
    return http.mainInstance.get(`${API_URL}/findById/${id}`);
};

// Método para salvar um novo laboratório
const saveLaboratorio = (laboratorio) => {
    return http.mainInstance.post(API_URL, laboratorio);
};

// Verificar duplicidade
const verificarDuplicidade = (sala, andar) => {
    return http.mainInstance.get(`${API_URL}/verificarDuplicidade?sala=${sala}&andar=${andar}`);
};

// Método para atualizar um laboratório existente
const updateLaboratorio = (id, laboratorio) => {
    return http.mainInstance.put(`${API_URL}/${id}`, laboratorio);
};

// Método para excluir um laboratório por ID
const deleteLaboratorio = (id) => {
    console.log(`Deletando laboratório com ID: ${id}`);
    return http.mainInstance.delete(`${API_URL}/${id}`);
};


// Exportação do serviço
const LaboratorioService = {
    getAllLaboratorios,
    getById,
    saveLaboratorio,
    update: updateLaboratorio,
    verificarDuplicidade,
    deleteLaboratorio  // Aqui, exportando a função corretamente
};

export default LaboratorioService;
