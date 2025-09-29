import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useRef, useState, useEffect } from "react";
import OcorrenciasService from "../../services/OcorrenciasServices";

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

    useEffect(() => {
        if (_dbRecords.current) {
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

    // Marcar como solucionada
    const handleMarcarComoSolucionada = () => {
        OcorrenciasService.update(ocorrencia.id, { ...ocorrencia, statusOcorrencia: "SOLUCIONADA" })
            .then(() => {
                alert("Ocorrência marcada como solucionada!");
                navigate("/ocorrenciaSolucionada");
            })
            .catch(error => {
                console.error("Erro ao marcar como solucionada:", error);
                alert("Erro ao marcar como solucionada.");
            });
    };

    // Atualizar ocorrência
    const handleUpdate = () => {
        const updatedOcorrencia = {
            ...ocorrencia,
            descricao: document.getElementById("inputTexto").value
        };

        OcorrenciasService.update(ocorrencia.id, updatedOcorrencia)
            .then(() => {
                alert("Ocorrência atualizada com sucesso!");
                navigate("/ocorrenciaPendente");
            })
            .catch(error => {
                console.error("Erro ao atualizar ocorrência:", error);
                alert("Erro ao atualizar ocorrência.");
            });
    };

    // Excluir ocorrência
    const handleDelete = () => {
        if (window.confirm("Deseja realmente excluir esta ocorrência?")) {
            OcorrenciasService.deleteOcorrencia(ocorrencia.id)
                .then(() => {
                    alert("Ocorrência excluída com sucesso!");
                    navigate("/ocorrenciaPendente");
                })
                .catch(error => {
                    console.error("Erro ao excluir ocorrência:", error);
                    alert("Erro ao excluir ocorrência.");
                });
        }
    };

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/ocorrenciaPendente'}
                    title={'Informações da Ocorrência'}
                    logo={logo}
                />
                <section className="fundo m-2 p-2 shadow-lg">
                    <form className="mx-5 p-2 border">
                        <div className="row my-3 g-1">
                            <label htmlFor="inputID" className="col-md-1 col-form-label">ID:</label>
                            <div className="col-md-2">
                                <input type="text" className="form-control" id="inputID" value={ocorrencia.id || ""} readOnly />
                            </div>

                            <label htmlFor="inputData" className="col-md-2 col-form-label">Data:</label>
                            <div className="col-md-3">
                                <input type="text" className="form-control" id="inputData" value={ocorrencia.dataOcorrencia || ""} readOnly />
                            </div>

                            <label htmlFor="inputStatus" className="col-md-2 col-form-label">Status:</label>
                            <div className="col-md-2">
                                <input type="text" className="form-control" id="inputStatus" value={ocorrencia.statusOcorrencia || ""} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="inputRM" className="col-md-2 col-form-label">RM:</label>
                            <div className="col-md-10">
                                <input type="text" className="form-control" id="inputRM" value={ocorrencia.usuario?.rm || ""} readOnly />
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="inputTexto" className="form-label">Descrição:</label>
                            <textarea
                                rows={5}
                                className="form-control"
                                id="inputTexto"
                                defaultValue={ocorrencia.descricao || ""}
                            />
                        </div>

                        <div className="col-12 d-flex justify-content-around">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Alterar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                Excluir
                            </button>
                            <button type="button" className="btn btn-success" onClick={handleMarcarComoSolucionada}>
                                Marcar como solucionada
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default PendenteVer;
