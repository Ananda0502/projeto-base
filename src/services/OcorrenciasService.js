import http from '../common/http-common';

const API_URL = "http://localhost:8080/ocorrencias";

// Método para buscar todos as ocorrências
const getAllOcorrencias = () => {
    return http.mainInstance.get(API_URL);
};

// Método para buscar uma ocorrência por ID
const getById = (id) => {
    return http.mainInstance.get(`${API_URL}/findById/${id}`);
};

// Método para salvar uma nova ocorrência
const saveOcorrencia = (ocorrencia) => {
    return http.mainInstance.post(API_URL, ocorrencia);
};

// Verificar duplicidade
// const verificarDuplicidade = (sala, andar) => {
//     return http.mainInstance.get(`${API_URL}/verificarDuplicidade?sala=${sala}&andar=${andar}`);
// };

// Método para atualizar uma ocorrência existente
const updateOcorrencia = (id, ocorrencia) => {
    return http.mainInstance.put(`${API_URL}/${id}`, ocorrencia);
};

// Método para excluir uma ocorrência por ID
const deleteOcorrencia = (id) => {
    console.log(`Deletando ocorrência com ID: ${id}`);
    return http.mainInstance.delete(`${API_URL}/${id}`);
};


// Exportação do serviço
const OcorrenciasService = {
    getAllOcorrencias,
    getById,
    saveOcorrencia,
    update: updateOcorrencia,
    deleteOcorrencia  // Aqui, exportando a função corretamente
};

export default OcorrenciasService;
