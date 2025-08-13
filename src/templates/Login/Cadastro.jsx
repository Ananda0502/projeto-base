import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Cadastro.css';
import logo from '../../assets/images/system-logo_128_x_128.png';
import { cadastrarTecnico } from "../../services/TecnicoService";


function Cadastro() {
  const [usuario, setUsuario] = useState({
    nome: "",
    rm: "",
    email: "",
    senha: "",
    nivelAcesso: "USER",
    statusUsuario: "ATIVO"
  });

  const [errorMessage, setErrorMessage] = useState("");  // estado para mensagem de erro

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!usuario.nome || !usuario.rm || !usuario.email || !usuario.senha || !usuario.nivelAcesso || !usuario.statusUsuario) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    // Validação simples: email deve conter '@'
    if (!usuario.email.includes("@")) {
      setErrorMessage("Por favor, insira um e-mail válido contendo '@'.");
      return;
    }

    try {
      await cadastrarTecnico(usuario)
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Cadastro de usuário realizado com sucesso!");
      navigate("/Home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
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
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              id="nome"
              value={usuario.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rm" className="form-label">RM:</label>
            <input
              type="text"
              className="form-control"
              name="rm"
              id="rm"
              value={usuario.rm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={usuario.email}
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
              value={usuario.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nivelAcesso" className="form-label">Nível de Acesso:</label>
            <select
              className="form-control"
              name="nivelAcesso"
              id="nivelAcesso"
              value={usuario.nivelAcesso}
              onChange={handleChange}
              required
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
              <option value="TECNICO">Técnico</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="statusUsuario" className="form-label">Status:</label>
            <select
              className="form-control"
              name="statusUsuario"
              id="statusUsuario"
              value={usuario.statusUsuario}
              onChange={handleChange}
              required
            >
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
              <option value="TROCAR_SENHA">Trocar Senha</option>
            </select>
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
