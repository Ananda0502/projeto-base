import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import axios from 'axios';

const ListaTecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/usuario/findAll');
        console.log(res.data);
        setTecnicos(res.data);
      } catch (err) {
        console.error("Erro ao buscar técnicos:", err);
      }
    };
    fetchTecnicos();
  }, []);

  // Função para excluir um técnico
  const deleteTecnico = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/usuario/${id}`);
      alert(response.data);
      const updatedTecnicos = tecnicos.filter(tec => tec.id !== id);
      setTecnicos(updatedTecnicos);
    } catch (error) {
      console.error("Erro ao excluir técnico:", error);
      alert("Erro ao excluir técnico.");
    }
  };

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/home'} title={'Lista de Técnicos'} />
        <h2 className="mb-4">Lista de Técnicos</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Especialidade</th>
              <th scope="col">Ação</th> 
            </tr>
          </thead>
          <tbody>
            {tecnicos.length > 0 ? (
              tecnicos.map((tec) => (
                <tr key={tec.id}>
                  <td>{tec.nome}</td>
                  <td>{tec.email}</td>
                  <td>{tec.especialidade}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTecnico(tec.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">Nenhum técnico encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaTecnicos;
