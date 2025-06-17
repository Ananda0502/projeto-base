import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import axios from 'axios';

const ListaTecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    axios.get('/api/tecnicos')
      .then(res => setTecnicos(res.data))
      .catch(err => console.error("Erro ao buscar técnicos:", err));
  }, []);

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/home'} title={'Lista de Técnicos'} />
        <h2>Lista de Técnicos</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            {tecnicos.map((tec) => (
              <tr key={tec.id}>
                <td>{tec.nome}</td>
                <td>{tec.email}</td>
                <td>{tec.especialidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaTecnicos;
