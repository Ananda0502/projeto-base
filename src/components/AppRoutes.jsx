import { Routes, Route } from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import OcorrenciaPendente from "../templates/Pendentes/OcorrenciaPendente"
import PendenteLer from "../templates/Pendentes/PendenteLer"

import OcorrenciaSolucionada from "../templates/Solucionadas/OcorrenciaSolucionada"
import SolucionadaLer from "../templates/Solucionadas/SolucionadaLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import Laboratorio from "../templates/Laboratorio/Laboratorio"
import LaboratorioEditar from "../templates/Laboratorio/LaboratorioEditar"
import LaboratorioNovo from "../templates/Laboratorio/LaboratorioNovo"
import LaboratorioLista from "../templates//Laboratorio/LaboratorioLista"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPass />} />

        <Route path="/ocorrenciaPendente" element={<OcorrenciaPendente />} />
        <Route path="/pendenteLer" element={<PendenteLer />} />

        <Route path="/ocorrenciaSolucionada" element={<OcorrenciaSolucionada />} />
        <Route path="/solucionadaLer" element={<SolucionadaLer />} />

        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

        <Route path="/laboratorio" element={<Laboratorio />} />
        <Route path="/laboratoriolista" element={<LaboratorioLista />} />
        <Route path="/laboratorionovo" element={<LaboratorioNovo />} />
        <Route path="/laboratoriolista/:id" element={<LaboratorioEditar />} />

      </Routes>
    </div>
  )
}
export default AppRoutes