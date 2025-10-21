import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação


const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate(); // Instancia o hook de navegação

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:8080/usuario/findAll');
        console.log(res.data);
        setUsuarios(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsuarios();
  }, []);

  // Função para excluir um usuário
  const deleteUsuario = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/usuario/${id}`);
      alert(response.data); // Mensagem do backend
      setUsuarios(usuarios.filter(user => user.id !== id)); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  // Função para redirecionar para a página de edição
  const handleEdit = (id) => {
    navigate(`/editar-usuario/${id}`);
  };

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header goto={'/home'} title={'Lista de Usuários'} />
        <h2 className="mb-4">Lista de Usuários</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Nível de Acesso</th>
              <th scope="col">Ação</th> 
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, idx) => (
                <tr key={idx}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.nivelAcesso}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(usuario.id)} // Navega para a página de edição
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUsuario(usuario.id)} // Chama a função para excluir
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">Nenhum usuário encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaUsuarios;
