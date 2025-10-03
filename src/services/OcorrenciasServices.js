import http from '../common/http-common';
const API_URL = "/ocorrencia";

const getAllOcorrencias = () => http.mainInstance.get(`${API_URL}/findAll`);
const getPendentes = () => http.mainInstance.get(`${API_URL}/findPendentes`); // Este método precisa ser criado no Service/Controller Java
const getSolucionadas = () => http.mainInstance.get(`${API_URL}/findSolucionadas`); // Este método precisa ser criado no Service/Controller Java
const getById = (id) => http.mainInstance.get(`${API_URL}/findById/${id}`);

const saveOcorrencia = (data) => http.mainInstance.post(`${API_URL}/save`, data, {
    headers: { "Content-Type": "application/json" }
});

const updateOcorrencia = (id, data) => http.mainInstance.put(`${API_URL}/update/${id}`, data);
const solucionarOcorrencia = (id) => http.mainInstance.put(`${API_URL}/solucionar/${id}`); // Novo método para solução, chama endpoint Java
const deleteOcorrencia = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const OcorrenciasService = {
    getAllOcorrencias,
    getPendentes,
    getSolucionadas,
    getById,
    create: saveOcorrencia, // Renomeado para 'create' para bater com o uso no .jsx
    update: updateOcorrencia,
    marcarComoSolucionada: solucionarOcorrencia, // Usa o novo método para solução
    deleteOcorrencia
};

export default OcorrenciasService;