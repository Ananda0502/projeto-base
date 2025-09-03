import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect, useState } from "react";
import LaboratorioService from "../../services/LaboratorioService";

const LaboratorioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [laboratorio, setLaboratorio] = useState({
        sala: '',
        andar: ''
    });

    useEffect(() => {
        LaboratorioService.getById(id)
            .then((response) => {
                const lab = response.data;
                // Separar nome em sala e andar
                if (lab.nome) {
                    const match = lab.nome.match(/Sala (\d+) - (\d+)º andar/);
                    if (match) {
                        lab.sala = match[1];
                        lab.andar = match[2];
                    }
                }
                setLaboratorio(lab);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Criar nome para verificação de duplicidade
        const nomeCompleto = `Sala ${laboratorio.sala} - ${laboratorio.andar}º andar`;

        LaboratorioService.verificarDuplicidade(nomeCompleto)
            .then((response) => {
                if (response.data === true) {
                    alert("Já existe um laboratório com esta sala e andar!");
                } else {
                    // Atualizar objeto com nome correto antes de enviar
                    const laboratorioAtualizado = {
                        ...laboratorio,
                        nome: nomeCompleto,
                        statusLocal: laboratorio.statusLocal || 'ATIVO'
                    };

                    LaboratorioService.update(id, laboratorioAtualizado)
                        .then(() => {
                            alert('Laboratório atualizado com sucesso!');
                            navigate("/laboratorio");
                        })
                        .catch((error) => {
                            console.error('Erro ao atualizar laboratório:', error);
                            alert('Erro ao atualizar laboratório.');
                        });
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir este laboratório?")) {
            LaboratorioService.deleteLaboratorio(id)
                .then(() => {
                    alert('Laboratório excluído com sucesso!');
                    navigate('/laboratorio');
                })
                .catch((error) => {
                    console.error('Erro ao excluir laboratório:', error);
                });
        }
    };

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/laboratorio'}
                    title={'Editar Laboratório'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-2">
                            <label htmlFor="sala" className="form-label" style={{ color: 'black' }}>Escolha a Sala</label>
                            <select
                                id="sala"
                                className="form-select"
                                value={laboratorio.sala || ''}
                                onChange={(e) => setLaboratorio({ ...laboratorio, sala: e.target.value })}
                            >
                                <option value="">Laboratórios</option>
                                <option value="01">Sala 01</option>
                                <option value="02">Sala 02</option>
                                <option value="03">Sala 03</option>
                                <option value="04">Sala 04</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label htmlFor="andar" className="form-label" style={{ color: 'black' }}>Escolha o Andar</label>
                            <select
                                id="andar"
                                className="form-select"
                                value={laboratorio.andar || ''}
                                onChange={(e) => setLaboratorio({ ...laboratorio, andar: e.target.value })}
                            >
                                <option value="">Andares</option>
                                <option value="1">1° andar</option>
                                <option value="2">2° andar</option>
                                <option value="3">3° andar</option>
                                <option value="4">4° andar</option>
                            </select>
                        </div>

                        <div className="col-12 d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">
                                Salvar Alterações
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                Excluir Laboratório
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default LaboratorioEditar;
