import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OcorrenciasService from "../../services/OcorrenciasServices.js";
import LaboratorioService from "../../services/LaboratorioService.js"; // Importando o serviço de Laboratório
import "bootstrap/dist/css/bootstrap.min.css";
import './Ocorrencias.css';

const Ocorrencias = () => {
  const [ocorrencia, setOcorrencia] = useState({
    descricao: "",
    anexo: "",
    patrimonio: "",
    laboratorioId: "", // Adiciona a ID do laboratório
  });

  const [laboratorios, setLaboratorios] = useState([]); // Estado para armazenar os laboratórios

  // Carrega os laboratórios assim que o componente é montado
  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await LaboratorioService.getAllLaboratorios();
        setLaboratorios(response.data);  // Armazena os laboratórios no estado
      } catch (error) {
        console.error("Erro ao carregar laboratórios", error);
      }
    };
    fetchLaboratorios();
  }, []);

  const handleChange = (e) => {
    setOcorrencia({ ...ocorrencia, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia a ocorrência com a ID do laboratório
      await OcorrenciasService.saveOcorrencia(ocorrencia);
      alert("Ocorrência cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar ocorrência", error);
      alert("Erro ao cadastrar ocorrência.");
    }
  };

  return (
    <div className="container mt-5" id="ocorrencia">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/home" className="btn btn-secondary btn-sm">
          Voltar
        </Link>
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
          <label className="form-label">Anexo</label>
          <input
            type="text"
            className="form-control"
            name="anexo"
            value={ocorrencia.anexo}
            onChange={handleChange}
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

        {/* Dropdown para selecionar o laboratório */}
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
            {laboratorios.map((laboratorio) => (
              <option key={laboratorio.id} value={laboratorio.id}>
                {laboratorio.sala} - {laboratorio.andar}
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
