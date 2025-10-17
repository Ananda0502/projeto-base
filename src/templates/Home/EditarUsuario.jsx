import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    especialidade: "",
    nivelAcesso: "", // Admin ou User ou Tecnico
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // Recebe o ID do usuário a ser editado
  const navigate = useNavigate();

  // Carrega os dados do usuário ao carregar a página
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/usuario/findById/${id}`);
        setUsuario(res.data); // Preenche os dados do usuário no formulário
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setErrorMessage("Erro ao carregar os dados do usuário.");
      }
    };
    fetchUsuario();
  }, [id]);

  // Função para enviar os dados atualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/usuario/editar/${id}`, usuario);
      alert("Usuário atualizado com sucesso!");
      navigate("/listar-usuarios"); 
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
      setErrorMessage("Erro ao atualizar cadastro.");
    }
  };


  // Função para alterar o estado dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Usuário</h2>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="nome" style={styles.label}>Nome:</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            id="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={usuario.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="nivelAcesso" style={styles.label}>Nível de Acesso:</label>
          <select
            className="form-select"
            name="nivelAcesso"
            id="nivelAcesso"
            value={usuario.nivelAcesso}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="USER">Usuário Comum</option>
            <option value="ADMIN">Administrador</option>
            <option value="TECNICO">Técnico</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Salvar</button>
      </form>
    </div>
  );
};







// Estilos em formato de objeto JS
const styles = {
  container: {
    backgroundColor: '#0b112b',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    textAlign: 'center',
    color: '#f1f1f1',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#1832a3',
    color: 'aqua',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default EditarUsuario;
