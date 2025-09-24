import http from '../common/http-common';
const API_URL = "/ocorrencia";

const getAllOcorrencias = () => {
    return http.mainInstance.get(API_URL + "/findAll");
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

const create = (data) => {
  return http.mainInstance.post(API_URL + "/save", {
    descricao: data.descricao,
    usuario: { id: data.usuario.id },
    localidade: { id: data.localidade }
  });
};

/*
const create = (data) => {
  const formData = new FormData();

  formData.append('usuario.id', data.usuario);
  formData.append('localidade.id', data.localidade);
  formData.append('descricao', data.descricao);

  return http.mainInstance.post(API_URL + "/save", formData);
};
*/
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
    create,
    update: updateOcorrencia,
    deleteOcorrencia
};

export default OcorrenciasService;
