import React, { useState } from "react";
 import OcorrenciasService from "../../services/OcorrenciasServices.js";
 import "bootstrap/dist/css/bootstrap.min.css";
 import './Ocorrencias.css';
 
 const Ocorrencias = () => {
   const [ocorrencia, setOcorrencia] = useState({
     descricao: "",
     anexo: "",
     dataAbertura: "",
     dataAtendimento: "",
     statusOcorrencia: "",
     patrimonio: "",
   });
 
   const handleChange = (e) => {
     setOcorrencia({ ...ocorrencia, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await OcorrenciasService.saveOcorrencia(ocorrencia);
       alert("Ocorrência cadastrada com sucesso!");
     } catch (error) {
       console.error("Erro ao cadastrar ocorrência", error);
       alert("Erro ao cadastrar ocorrência.");
     }
   };
 
   return (
     <div className="container mt-5">
       <h2 className="text-center">Cadastro de Ocorrências</h2>
       <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
         <div className="mb-3">
           <label className="form-label">Descrição</label>
           <textarea
             className="form-control"
             name="descricao"
             value={ocorrencia.descricao}
             onChange={handleChange}
           ></textarea>
         </div>
         <div className="mb-3">
           <label className="form-label">Anexo</label>
           <input
             type="text"
             className="form-control"
             name="anexo"
             value={ocorrencia.anexo}
             onChange={handleChange}
           />
         </div>
         <div className="mb-3">
           <label className="form-label">Data de Abertura</label>
           <input
             type="datetime-local"
             className="form-control"
             name="dataAbertura"
             value={ocorrencia.dataAbertura}
             onChange={handleChange}
           />
         </div>
         <div className="mb-3">
           <label className="form-label">Data de Atendimento</label>
           <input
             type="datetime-local"
             className="form-control"
             name="dataAtendimento"
             value={ocorrencia.dataAtendimento}
             onChange={handleChange}
           />
         </div>
         <div className="mb-3">
           <label className="form-label">Status da Ocorrência</label>
           <input
             type="text"
             className="form-control"
             name="statusOcorrencia"
             value={ocorrencia.statusOcorrencia}
             onChange={handleChange}
           />
         </div>
         <div className="mb-3">
           <label className="form-label">Patrimônio</label>
           <input
             type="number"
             className="form-control"
             name="patrimonio"
             value={ocorrencia.patrimonio}
             onChange={handleChange}
           />
         </div>
         <button type="submit" className="btn btn-primary w-100" >
           Cadastrar Ocorrência
         </button>
       </form>
     </div>
   )
 }
 
 export default Ocorrencias;