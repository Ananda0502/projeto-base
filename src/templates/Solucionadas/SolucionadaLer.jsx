import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useRef, useState, useEffect } from "react";
import OcorrenciasService from "../../services/OcorrenciasServices";

const SolucionadaLer = () => { 
    const { id } = useParams();
    const navigate = useNavigate();
    const _dbRecords = useRef(true);

    const objectState = {
        id: null,
        descricao: "",
        dataOcorrencia: "",
        usuario: { id: null, nome: "", rm: "" },
        localidade: { id: null, nome: "" },
        statusOcorrencia: ""
    };

    const [ocorrencia, setOcorrencia] = useState(objectState);

    useEffect(() => {
        // Carregar Ocorrência
        if (_dbRecords.current && id) {
            OcorrenciasService.getById(id)
                .then(response => {
                    setOcorrencia(response.data);
                })
                .catch(e => console.log(e));
        }

        return () => {
            _dbRecords.current = false;
        };
    }, [id]);

    // FUNÇÃO PARA EXCLUIR OCORRÊNCIA
    const handleDelete = () => {
        if (window.confirm("Deseja realmente EXCLUIR esta ocorrência SOLUCIONADA? Esta ação não pode ser desfeita.")) {
            OcorrenciasService.deleteOcorrencia(ocorrencia.id)
                .then(() => {
                    alert("Ocorrência excluída com sucesso! Redirecionando...");
                    // Redireciona para a lista de solucionadas após a exclusão
                    navigate("/ocorrenciaSolucionada");
                })
                .catch(error => {
                    console.error("Erro ao excluir ocorrência:", error);
                    alert("Erro ao excluir ocorrência.");
                });
        }
    };

    // Função auxiliar para formatar a data
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="corpo d-flex">
            {/* O Sidebar deve estar visível em todas as telas, se for a navegação principal */}
            <Sidebar /> 

            <div className="p-3 w-100">
                <Header
                    // Retorna para a lista de solucionadas
                    goto={'/ocorrenciaSolucionada'} 
                    title={'Visualizar Ocorrência Solucionada'}
                    logo={logo}
                />
                
                <section className="container mt-4">
                    <div className="card shadow-lg">
                        {/* Cabeçalho do Card: Status e ID */}
                        <div className="card-header bg-dark text-white">
                            **Ocorrência #{ocorrencia.id} - Status: {ocorrencia.statusOcorrencia}**
                        </div>
                        {/* Corpo do Card: Informações */}
                        <div className="card-body bg-secondary-subtle">
                            <form className="p-3"> 
                                
                                {/* Linha 1: ID, Data e RM (Campos de leitura) */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">ID:</label>
                                        <input type="text" className="form-control" value={ocorrencia.id || ""} readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Data de Abertura:</label>
                                        {/* Usando formatDate */}
                                        <input type="text" className="form-control" value={formatDate(ocorrencia.dataOcorrencia) || ""} readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">RM do Solicitante:</label>
                                        <input type="text" className="form-control" value={ocorrencia.usuario?.rm || ""} readOnly />
                                    </div>
                                </div>
                                
                                {/* Linha 2: Laboratório (Apenas Leitura) */}
                                <div className="row g-3 mb-4">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Laboratório (Localidade):</label>
                                        <input type="text" className="form-control" value={ocorrencia.localidade?.nome || ""} readOnly />
                                    </div>
                                </div>

                                {/* Linha 3: Descrição (Apenas Leitura) */}
                                <div className="row g-3 mb-5">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Descrição:</label>
                                        <textarea
                                            rows={6}
                                            className="form-control"
                                            value={ocorrencia.descricao || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Bloco de Ações: Excluir e Voltar */}
                                <div className="d-flex justify-content-center gap-3">
                                    {/* Botão de Excluir - Estilo Perigo (vermelho), tamanho pequeno (btn-sm) */}
                                    <button 
                                        type="button" 
                                        className="btn btn-danger btn-sm" 
                                        onClick={handleDelete}
                                    >
                                        <i className="bi bi-trash me-2"></i> Excluir Ocorrência
                                    </button>
                                    
                                    {/* Botão Voltar - Estilo Secundário (cinza), tamanho pequeno (btn-sm) */}
                                    <Link 
                                        to="/ocorrenciaSolucionada" 
                                        className="btn btn-secondary btn-sm"
                                    >
                                        <i className="bi bi-arrow-left-circle me-2"></i> Voltar à Lista
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SolucionadaLer;