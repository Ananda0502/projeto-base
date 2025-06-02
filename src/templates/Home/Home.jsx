import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate(); 
  const usuarioLogado = JSON.parse(sessionStorage.getItem("tecnico"));
  const isAdmin = usuarioLogado?.admin === true;

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
        <h1 id="saudacoes">
          BEM VINDO AO SISTEMA!
        </h1>

        {/* Caixa com o email do usuário */}
        <div className="email-box">
          {usuarioLogado?.rmtecnico}
        </div>

        {/* BOTÃO SÓ PARA ADM */}
        {isAdmin && (
          <div className="admin-button-container">
            <button
              className="btn btn-primary admin-button"
              onClick={() => navigate("/painel-admin")}
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
