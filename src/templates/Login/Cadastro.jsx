// src/templates/Login/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css'; // Se precisar de um estilo próprio para o cadastro

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

    // Verifica se a senha foi preenchida
    if (!usuario.senha) {
      alert("A senha não pode estar vazia!");
      return;
    }

    // Envia os dados para o backend
    try {
      // Aqui você fará o POST para o backend quando estiver pronto
      // await CadastroService.cadastrar(usuario);
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para a tela de login após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar o usuário", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">E-mail com RM:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
