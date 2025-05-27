import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Cadastro.css';
import logo from '../../assets/images/system-logo_128_x_128.png';
import TecnicoService from "../../services/TecnicoService";

function Cadastro() {
  const [tecnico, setTecnico] = useState({
    rmtecnico: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");  // estado para mensagem de erro

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTecnico({ ...tecnico, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tecnico.rmtecnico || !tecnico.senha) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    // Validação simples: o RM deve conter '@'
    if (!tecnico.rmtecnico.includes("@")) {
      setErrorMessage("Por favor, insira um RM válido contendo '@'.");
      return;
    }

    try {
      await TecnicoService.cadastrarTecnico(tecnico);
      alert("Cadastro de técnico realizado com sucesso!");
      navigate("/Home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // ex: "RM já cadastrado."
      } else {
        setErrorMessage("Erro ao cadastrar. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="cadastro-form">
        <div className="cadastro-logo">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rmtecnico" className="form-label">RM:</label>
            <input
              type="text"
              className="form-control"
              name="rmtecnico"
              id="rmtecnico"
              value={tecnico.rmtecnico}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              id="senha"
              value={tecnico.senha}
              onChange={handleChange}
              required
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-entrar">
            Cadastrar
          </button>
        </form>

        <div className="d-flex justify-content-center mt-3">
          <p>Já possui Login? <Link to="/login">Clique aqui</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
