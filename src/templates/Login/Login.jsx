import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/system-logo_128_x_128.png';
import './Login.css';
import TecnicoService from "../../services/TecnicoService";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    rm: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await TecnicoService.loginTecnico(form.email, form.rm, form.senha);

      console.log("Resposta da API:", response); // Pra debug

      if (response && Object.keys(response).length > 0) {
        sessionStorage.setItem("tecnico", JSON.stringify(response));

        if (response.email === "adm@gmail.com") {
          localStorage.setItem("isAdmin", "1");
        } else {
          localStorage.setItem("isAdmin", "0");
        }

        navigate("/home");

      } else {
        setErrorMessage("Login inválido. Verifique Email, RM e senha.");
      }

    } catch (error) {
      console.error("Erro ao tentar login:", error);
      setErrorMessage("Erro ao tentar logar. Verifique Email, RM e senha.");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-0 fw-bold" id="email">Email:</label>
          <input
            type="email"
            className="form-control text-center fw-medium shadow"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rm" className="form-label mb-0 fw-bold" id="rm">RM:</label>
          <input
            type="text"
            className="form-control text-center fw-medium shadow"
            name="rm"
            value={form.rm}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="senha" className="form-label mb-0 fw-bold" id="senha">Senha:</label>
          <input
            type="password"
            className="form-control text-center fw-medium shadow"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="d-flex justify-content-around mb-3 mt-2">
          <button
            className="btn btn-warning fw-medium shadow"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <button
            className="btn btn-success fw-medium shadow"
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
