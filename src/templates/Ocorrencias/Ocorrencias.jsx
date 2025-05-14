import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OcorrenciasService from "../../services/OcorrenciasServices.js";
import LaboratorioService from "../../services/LaboratorioService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './Ocorrencias.css';

const Ocorrencias = () => {
  const [ocorrencia, setOcorrencia] = useState({
    descricao: "",
    patrimonio: "",
    laboratorioId: ""
  });
  const [anexo, setAnexo] = useState(null);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await LaboratorioService.getAllLaboratorios();
        setLaboratorios(response.data);
      } catch (error) {
        console.error("Erro ao carregar laboratórios", error);
      }
    };
    fetchLaboratorios();
  }, []);

  const handleChange = (e) => {
    setOcorrencia({ ...ocorrencia, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAnexo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("descricao", ocorrencia.descricao);
    formData.append("patrimonio", ocorrencia.patrimonio);
    formData.append("laboratorioId", ocorrencia.laboratorioId);
    if (anexo) {
      formData.append("anexo", anexo);
    }

    try {
      await OcorrenciasService.saveOcorrencia(formData);
      alert("Ocorrência cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar ocorrência", error);
      alert("Erro ao cadastrar ocorrência.");
    }
  };

  return (
    <div className="container mt-5" id="ocorrencia">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/home" className="btn btn-secondary btn-sm">Voltar</Link>
        <h2 className="mx-auto">Cadastro de Ocorrências</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="descricao"
            value={ocorrencia.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Anexo (imagem)</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Patrimônio</label>
          <input
            type="number"
            className="form-control"
            name="patrimonio"
            value={ocorrencia.patrimonio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Laboratório</label>
          <select
            className="form-control"
            name="laboratorioId"
            value={ocorrencia.laboratorioId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Laboratório</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.sala} - {lab.andar}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cadastrar Ocorrência
        </button>
      </form>
    </div>
  );
};

export default Ocorrencias;
