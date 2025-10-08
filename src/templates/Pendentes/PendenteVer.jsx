import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useRef, useState, useEffect } from "react";
import OcorrenciasService from "../../services/OcorrenciasServices";
import LaboratorioService from "../../services/LaboratorioService"; 

const PendenteVer = () => {
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
    const [descricaoEditavel, setDescricaoEditavel] = useState("");
    const [localidades, setLocalidades] = useState([]);
    const [localidadeEditavelId, setLocalidadeEditavelId] = useState(0);


    useEffect(() => {
        // 1. Carregar Ocorrência
        if (_dbRecords.current && id) {
            OcorrenciasService.getById(id)
                .then(response => {
                    setOcorrencia(response.data); 
                    setDescricaoEditavel(response.data.descricao);
                    setLocalidadeEditavelId(response.data.localidade?.id || 0); 
                })
                .catch(e => console.log(e));
        }

        // 2. Carregar Localidades
        const fetchLocalidades = async () => {
            try {
                const response = await LaboratorioService.getAllLaboratorios();
                setLocalidades(response.data);
            } catch (error) {
                console.error("Erro ao carregar laboratórios", error);
            }
        };
        fetchLocalidades();

        return () => {
            _dbRecords.current = false;
        };
    }, [id]);

    // Manipulador de mudança para a textarea de descrição
    const handleDescricaoChange = (e) => {
        setDescricaoEditavel(e.target.value);
    }
    
    // Manipulador de mudança para o select de laboratório
    const handleLocalidadeChange = (e) => {
        setLocalidadeEditavelId(parseInt(e.target.value));
    }

    // Marcar como solucionada
    const handleMarcarComoSolucionada = () => {
        if (window.confirm("Tem certeza que deseja marcar esta ocorrência como SOLUCIONADA?")) {
            OcorrenciasService.marcarComoSolucionada(ocorrencia.id)
                .then(() => {
                    alert("Ocorrência marcada como solucionada!");
                    navigate("/ocorrenciaSolucionada");
                })
                .catch(error => {
                    console.error("Erro ao marcar como solucionada:", error);
                    alert("Erro ao marcar como solucionada.");
                });
        }
    };

    // Atualizar ocorrência (CORRIGIDO PARA ENVIAR O OBJETO COMPLETO)
    const handleUpdate = () => {
        if (!descricaoEditavel.trim()) {
            alert("A descrição não pode estar vazia.");
            return;
        }
        if (localidadeEditavelId === 0) {
            alert("Selecione um laboratório válido.");
            return;
        }

        // COPIA TODOS OS DADOS DA OCORRÊNCIA EXISTENTE
        const updatedOcorrencia = {
            ...ocorrencia, 
            descricao: descricaoEditavel,
            // Sobrescreve a localidade com o ID selecionado
            localidade: { id: localidadeEditavelId }
            // Os campos 'dataOcorrencia', 'statusOcorrencia' e 'usuario' 
            // já estão incluídos pelo '...ocorrencia'
        };

        OcorrenciasService.update(ocorrencia.id, updatedOcorrencia)
            .then(() => {
                alert("Ocorrência atualizada com sucesso!");
                navigate("/ocorrenciaPendente");
            })
            .catch(error => {
                // Se ainda ocorrer um erro 500, a causa é no backend
                console.error("Erro ao atualizar ocorrência:", error);
                alert("Erro ao atualizar ocorrência.");
            });
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
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/ocorrenciaPendente'}
                    title={'Detalhes da Ocorrência Pendente'}
                    logo={logo}
                />
                
                <section className="container mt-4">
                    <div className="card shadow-lg">
                        {/* Cabeçalho do Card (Status e ID) */}
                        <div className="card-header bg-dark text-white">
                            **Ocorrência #{ocorrencia.id} - Status: {ocorrencia.statusOcorrencia}**
                        </div>
                        {/* Corpo do Card (Formulário) */}
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
                                        <input type="text" className="form-control" value={formatDate(ocorrencia.dataOcorrencia) || ""} readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">RM do Solicitante:</label>
                                        <input type="text" className="form-control" value={ocorrencia.usuario?.rm || ""} readOnly />
                                    </div>
                                </div>
                                
                                {/* Linha 2: Laboratório (Editável) */}
                                <div className="row g-3 mb-4">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Laboratório (Localidade):</label>
                                        <select 
                                            className="form-control" 
                                            value={localidadeEditavelId}
                                            onChange={handleLocalidadeChange}
                                        >
                                            <option value={0} disabled>Selecione o Laboratório</option>
                                            {localidades.map((localidade) => (
                                                <option key={localidade.id} value={localidade.id}>
                                                    {localidade.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Linha 3: Descrição (Editável) */}
                                <div className="row g-3 mb-5">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Descrição (Edição):</label>
                                        <textarea
                                            rows={6}
                                            className="form-control"
                                            value={descricaoEditavel || ""}
                                            onChange={handleDescricaoChange}
                                        />
                                    </div>
                                </div>

                                {/* Bloco de Ações: Alterar e Solucionada */}
                                <div className="d-flex justify-content-center gap-3">
                                    {/* Botão de Alterar (Primário - Azul) - com btn-sm */}
                                    <button 
                                        type="button" 
                                        className="btn btn-primary btn-sm" 
                                        onClick={handleUpdate}
                                    >
                                        <i className="bi bi-pencil-square me-2"></i> Alterar
                                    </button>
                                    
                                    {/* Botão Solucionar (Sucesso - Verde) - com btn-sm e texto completo */}
                                    <button 
                                        type="button" 
                                        className="btn btn-success btn-sm" 
                                        onClick={handleMarcarComoSolucionada}
                                    >
                                        <i className="bi bi-check-circle me-2"></i> Marcar como Solucionada
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PendenteVer;