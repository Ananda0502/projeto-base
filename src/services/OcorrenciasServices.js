import http from '../common/http-common';

const API_URL = "http://localhost:8080/ocorrencia";

const getAllOcorrencias = () => {
    return http.mainInstance.get(API_URL);
};

const getById = (id) => {
    return http.mainInstance.get(`${API_URL}/findById/${id}`);
};

const saveOcorrencia = (ocorrencia) => {
    return http.mainInstance.post(`${API_URL}/save`, ocorrencia, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};

const updateOcorrencia = (id, ocorrencia) => {
    return http.mainInstance.put(`${API_URL}/${id}`, ocorrencia);
};

const deleteOcorrencia = (id) => {
    return http.mainInstance.delete(`${API_URL}/${id}`);
};

const OcorrenciasService = {
    getAllOcorrencias,
    getById,
    saveOcorrencia,
    update: updateOcorrencia,
    deleteOcorrencia
};

export default OcorrenciasService;
