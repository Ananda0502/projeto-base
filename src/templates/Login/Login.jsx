import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/system-logo_128_x_128.png';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  // Função para gerenciar os campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Função de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home"); // Aqui você pode fazer a chamada ao backend, se necessário
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-0 fw-bold" id="rm">RM:</label>
          <input
            type="email"
            className="form-control text-center fw-medium shadow"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            aria-describedby="rmHelp"
          />
          <div id="rmHelp" className="invalid-feedback">
            Preencha esse campo
          </div>
        </div>
        <div>
          <label htmlFor="password" className="form-label mb-0 fw-bold" id="senha">Senha:</label>
          <input
            type="password"
            className="form-control text-center fw-medium shadow"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            aria-describedby="senhaHelp"
          />
          <div id="senhaHelp" className="invalid-feedback">
            Preencha esse campo
          </div>
        </div>

        <div className="d-flex justify-content-around mb-3 mt-2">
          <button
            className="btn btn-warning fw-medium shadow"
            id="cancelar"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success fw-medium shadow"
            id="entrar"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
