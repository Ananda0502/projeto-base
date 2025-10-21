import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import OcorrenciasService from "../../services/OcorrenciasServices.js";
import LaboratorioService from "../../services/LaboratorioService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './Ocorrencias.css';
import TecnicoService from "../../services/TecnicoService.js";


const Ocorrencias = () => {
  const navigate = useNavigate();
  const usuario = TecnicoService.getCurrentUser();

  const [formData, setFormData] = useState({
    descricao: '',
    localidade: null,
    usuario: usuario
  });

  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const response = await LaboratorioService.getAllLaboratorios();
        setLocalidades(response.data);
      } catch (error) {
        console.error("Erro ao carregar laboratórios", error);
      }
    };
    fetchLocalidades();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    // Trata a localidade para garantir que é um objeto com ID, se necessário
    if (name === 'localidade') {
        const localidadeId = parseInt(value);
        setFormData(formData => ({ 
            ...formData, 
            localidade: { id: localidadeId } // Assumindo que o backend espera um objeto com ID
        }));
    } else {
        setFormData(formData => ({ ...formData, [name]: value }));
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Garante que o usuário tem apenas o ID
    const payload = {
        ...formData,
        usuario: { id: formData.usuario?.id }
    };
    
    OcorrenciasService.create(payload).then(
      (response) => {
        console.log("Resposta do backend:", response);
        alert("Ocorrência cadastrada com sucesso!");
        // Garante que a rota está correta (case-sensitive)
        navigate("/ocorrenciaPendente"); 
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.error("Resposta do erro:", error.response?.data);
        alert("Erro ao cadastrar ocorrência: " + (error.response?.data || "Verifique o console."));
      }
    )
  }

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header
          goto={'/home'}
          title={'Cadastrar Ocorrência'}
          logo={logo}
        />
        <section className="p-2 m-2 shadow-lg">

          <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                value={formData.descricao || ""}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Laboratório</label>
              <select 
                // CORRIGIDO: Removida a prop defaultValue para evitar o aviso
                className="form-control"
                name="localidade"
                value={formData.localidade?.id || 0} // Mantido como componente controlado
                onChange={(e) => handleChange(e)}
                required
              >
                <option value={0} disabled>Selecione o Laboratório</option>
                {localidades?.map((localidade) => (
                  <option key={localidade.id} value={localidade.id}>
                    {localidade.nome}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Cadastrar Ocorrência
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Ocorrencias;