import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import axios from 'axios';

const ListaTecnicos = () => {
  const [tecnicos, setTecnicos] = useState ([]);

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/usuario/findAll');
        console.log(res.data)
        setTecnicos(res.data);
      } catch (err) {
        console.error("Erro ao buscar técnicos:", err);
      }
    };
    fetchTecnicos();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {
              tecnicos.length > 0 ? (
                tecnicos.map((tec, idx) => (
                  <tr key={idx}>
                    <td>{tec.nome}</td>
                    <td>{tec.email}</td>
                    <td>{tec.especialidade}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">Nada</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaTecnicos;
