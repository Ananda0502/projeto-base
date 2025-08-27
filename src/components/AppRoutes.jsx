import { Routes, Route } from "react-router-dom";
import App from "../templates/App/App";
import Home from "../templates/Home/Home";
import ListaTecnicos from '../templates/Home/ListaTecnicos';

import ForgotPass from "../templates/Login/ForgotPass";
import Login from "../templates/Login/Login";
import Cadastro from "../templates/Login/Cadastro"; 

import Ocorrencias from "../templates/Ocorrencias/Ocorrencias";

import OcorrenciaPendente from "../templates/Pendentes/OcorrenciaPendente";
import PendenteLer from "../templates/Pendentes/PendenteLer";

import OcorrenciaSolucionada from "../templates/Solucionadas/OcorrenciaSolucionada";
import SolucionadaLer from "../templates/Solucionadas/SolucionadaLer";

import Laboratorio from "../templates/Laboratorio/Laboratorio";
import LaboratorioEditar from "../templates/Laboratorio/LaboratorioEditar";
import LaboratorioNovo from "../templates/Laboratorio/LaboratorioNovo";
import LaboratoriosLista from "../templates/Laboratorio/LaboratoriosLista";

import EditarUsuario from "../templates/Home/EditarUsuario";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Cadastro />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/tecnicos" element={<ListaTecnicos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/forgotpass" element={<ForgotPass />} />

        <Route path="/ocorrenciaPendente" element={<OcorrenciaPendente />} />
        <Route path="/pendenteLer" element={<PendenteLer />} />

        <Route path="/ocorrenciaSolucionada" element={<OcorrenciaSolucionada />} />
        <Route path="/solucionadaLer" element={<SolucionadaLer />} />

        <Route path="/laboratorio" element={<Laboratorio />} />
        <Route path="/laboratorioslista" element={<LaboratoriosLista />} />
        <Route path="/laboratorionovo" element={<LaboratorioNovo />} />
        <Route path="/laboratorioeditar/:id" element={<LaboratorioEditar />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />

        <Route path="/editar-usuario/:id" element={<EditarUsuario />} /> 
        <Route path="/listar-usuarios" element={<ListaTecnicos />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
