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
    nivelAcesso: "ADMIN",
    statusUsuario: "ATIVO"
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [rmError, setRmError] = useState(""); 
  const [emailError, setEmailError] = useState(""); 
  // NOVO ESTADO: Mensagem de erro específica para a Senha
  const [senhaError, setSenhaError] = useState(""); 

  const navigate = useNavigate();

  // Expressão regular para proibir caracteres especiais fora do padrão (além de @, ., -)
  const emailSpecialCharRegex = /[!#$%^&*()+=\[\]{};':"\\|,<>/?]+/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // --- Validação de RM ---
    if (name === "rm") {
      
      const originalValue = value;
      const rmValue = originalValue.replace(/[^0-9]/g, '');
      
      if (originalValue !== rmValue) {
        setRmError("O campo RM deve conter apenas números (0-9).");
      } else {
        setRmError("");
      }

      // Limita a 5 caracteres após a limpeza
      const finalRmValue = rmValue.substring(0, 5);
      setUsuario({ ...usuario, [name]: finalRmValue });
      return;
    }

    // --- Validação de E-mail ---
    if (name === "email") {
      if (emailSpecialCharRegex.test(value)) {
        setEmailError("O e-mail não pode conter caracteres especiais como (!, #, $, %, etc.).");
      } else {
        setEmailError("");
      }
    }

    // --- Validação de Senha ---
    if (name === "senha") {
      let newValue = value;
      
      // 1. LIMITAÇÃO: Impede que o usuário digite mais de 10 caracteres
      if (value.length > 10) {
          newValue = value.substring(0, 10);
      }

      // 2. FEEDBACK: Define a mensagem de erro em tempo real
      if (newValue.length < 4 && newValue.length > 0) {
          setSenhaError("A senha deve ter no mínimo 4 caracteres.");
      } else if (newValue.length === 10) {
          setSenhaError("Máximo de 10 caracteres atingido.");
      } else {
          setSenhaError("");
      }

      setUsuario({ ...usuario, [name]: newValue });
      return;
    }
    
    // Atualiza outros campos
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    // BLOQUEIA O SUBMIT se houver erros em tempo real (RM, E-mail ou Senha)
    if (rmError || emailError || senhaError) {
        setErrorMessage(rmError || emailError || senhaError || "Corrija os erros do formulário.");
        return;
    }

    // Validação dos campos obrigatórios
    if (!usuario.nome || !usuario.rm || !usuario.email || !usuario.senha || !usuario.nivelAcesso) {
      setErrorMessage("Preencha todos os campos obrigatórios!");
      return;
    }

    // --- Validação do E-mail (Final) ---
    if (emailSpecialCharRegex.test(usuario.email) || !usuario.email.includes("@")) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }
    
    // --- Validação do RM (Final) ---
    if (!/^\d{1,5}$/.test(usuario.rm)) {
      setErrorMessage("O RM deve conter apenas números e ter no máximo 5 dígitos.");
      return;
    }

    // --- Validação da Senha (Final) ---
    if (usuario.senha.length < 4 || usuario.senha.length > 10) {
      setErrorMessage("A senha deve ter entre 4 e 10 caracteres.");
      return;
    }

    try {
      await cadastrarTecnico(usuario); 
      
      sessionStorage.setItem("usuario", JSON.stringify(usuario)); 
      
      alert("Cadastro de usuário realizado com sucesso! Faça login para continuar.");
      
      navigate("/login"); 
      
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
            {/* Mensagem de erro do RM */}
            {rmError && (
              <div className="alert alert-warning mt-1 p-1" style={{fontSize: '0.9em'}} role="alert">
                {rmError}
              </div>
            )}
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
            {/* Mensagem de erro do E-mail */}
            {emailError && (
              <div className="alert alert-warning mt-1 p-1" style={{fontSize: '0.9em'}} role="alert">
                {emailError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              id="senha"
              // O valor máximo de caracteres é controlado pela lógica no handleChange
              value={usuario.senha}
              onChange={handleChange}
              required
            />
            {/* Mensagem de erro da Senha */}
            {senhaError && (
              <div className="alert alert-warning mt-1 p-1" style={{fontSize: '0.9em'}} role="alert">
                {senhaError}
              </div>
            )}
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
              <option value="ADMIN">Administrador</option>
              <option value="TECNICO">Técnico</option>
            </select>
          </div>
          
          {/* Campo de Status fixo e somente leitura */}
          <div className="mb-3">
            <label htmlFor="statusUsuario" className="form-label">Status:</label>
            <input
                type="text"
                className="form-control"
                value="Ativo" 
                readOnly
            />
          </div>

          {/* Mensagem de erro geral (bloqueia o submit) */}
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