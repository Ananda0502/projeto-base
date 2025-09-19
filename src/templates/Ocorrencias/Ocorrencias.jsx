import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OcorrenciasService from "../../services/OcorrenciasServices.js";
import LaboratorioService from "../../services/LaboratorioService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './Ocorrencias.css';

const Ocorrencias = () => {
  const [descricao, setDescricao] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [patrimonio, setPatrimonio] = useState('')

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

  const handleDescricao = (e) => {
    setDescricao(e.target.value)
  } 

  const handleLocalidade = (e) => {
    let value 
    setLocalidade(e.target.value)
  } 

  const handlePatrimonio = (e) => {
    setPatrimonio(e.target.value)
  } 

  const handleFileChange = (e) => {
    setAnexo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let localidade_encontrada = await LaboratorioService.getById(localidade)
    localidade_encontrada = localidade_encontrada.data
    console.log(localidade_encontrada)
    const formData = {
      descricao,
      localidade_encontrada
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

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="descricao"
            value={descricao}
            onChange={(e) => handleDescricao(e)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Laboratório</label>
          <select
            className="form-control"
            name="laboratorioId"
            value={localidade}
            onChange={(e) => handleLocalidade(e)}            
            required
          >
            <option value="" selected disabled>Selecione o Laboratório</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nome}
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
