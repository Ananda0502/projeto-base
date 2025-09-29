import http from '../common/http-common';
const API_URL = "/ocorrencia";

const getAllOcorrencias = () => http.mainInstance.get(`${API_URL}/findAll`);
const getPendentes = () => http.mainInstance.get(`${API_URL}/findPendentes`);
const getSolucionadas = () => http.mainInstance.get(`${API_URL}/findSolucionadas`);
const getById = (id) => http.mainInstance.get(`${API_URL}/findById/${id}`);

const saveOcorrencia = (data) => http.mainInstance.post(`${API_URL}/save`, data, {
    headers: { "Content-Type": "application/json" }
});

const updateOcorrencia = (id, data) => http.mainInstance.put(`${API_URL}/update/${id}`, data);
const marcarComoSolucionada = (id) => http.mainInstance.put(`${API_URL}/solucionar/${id}`);
const deleteOcorrencia = (id) => http.mainInstance.delete(`${API_URL}/${id}`);

const OcorrenciasService = {
    getAllOcorrencias,
    getPendentes,
    getSolucionadas,
    getById,
    saveOcorrencia,
    update: updateOcorrencia,
    marcarComoSolucionada,
    deleteOcorrencia
};

export default OcorrenciasService;
