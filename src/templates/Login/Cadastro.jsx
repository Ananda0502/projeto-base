// src/templates/Login/Cadastro.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Adicionando Link aqui
import "bootstrap/dist/css/bootstrap.min.css";
import './Cadastro.css'; // Importa o CSS certo
import logo from '../../assets/images/system-logo_128_x_128.png';

const Cadastro = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.senha) {
      alert("A senha não pode estar vazia!");
      return;
    }

    try {
      // await CadastroService.cadastrar(usuario);
      alert("Cadastro realizado com sucesso!");
      navigate("/Home");
    } catch (error) {
      console.error("Erro ao cadastrar o usuário", error);
      alert("Erro ao cadastrar. Tente novamente.");
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
            <label htmlFor="email" className="form-label">RM:</label>
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
          <button
            type="submit"
            className="btn btn-entrar"
          >
            Cadastrar
          </button>
        </form>

        {/* Adicionando o link para a tela de login */}
        <div className="d-flex justify-content-center mt-3">
          <p>Já possui Login? <Link to="/login">Clique aqui</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
