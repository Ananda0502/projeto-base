import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate(); 
  const usuarioLogado = JSON.parse(sessionStorage.getItem("tecnico"));
  const isAdmin = usuarioLogado?.nivelAcesso == "ADMIN";

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header
          goto={'/home'}
          title={'Home'}
          logo={logo}
        />

        <div className="welcome-box text-center mx-auto">
          <h1 id="saudacoes" className="mb-3">
            BEM-VINDO AO SISTEMA!
          </h1>

          {/* Caixa com RM/Email */}
          <div className="email-box d-inline-flex align-items-center gap-2">
            <FaUser /> {usuarioLogado?.rmtecnico}
          </div>
        </div>

        {/* BOTÃO SÓ PARA ADM */}
        {isAdmin && (
          <div className="admin-button-container mt-4 text-center">
            <button
              className="admin-button"
              onClick={() => navigate("/tecnicos")}
            >
              Painel de Administração
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
