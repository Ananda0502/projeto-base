import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useEffect, useRef, useState } from "react";
import LaboratorioService from "../../services/LaboratorioService";

const LaboratorioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook para navegação
    const _dbRecords = useRef(true);
    const [laboratorio, setLaboratorio] = useState({});

    useEffect(() => {
        LaboratorioService.getById(id).then(
            (response) => {
                const laboratorio = response.data;
                setLaboratorio(laboratorio);
                console.log(laboratorio);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Lógica para atualizar o laboratório
        LaboratorioService.update(id, laboratorio)
            .then(() => {
                alert('Laboratório atualizado com sucesso!'); // Mensagem de sucesso
                navigate('/laboratorio'); // Redireciona para a página de lista de laboratórios
            })
            .catch((error) => {
                console.error('Erro ao atualizar laboratório:', error);
                alert('Erro ao atualizar laboratório.'); // Mensagem de erro
            });
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
                            <label htmlFor="sala" id="lab" className="form-label" style={{ color: 'black' }}>Escolha a Sala</label>
                            <select id="sala" className="form-select" style={{ color: 'black' }} value={laboratorio.sala || ''} onChange={(e) => setLaboratorio({ ...laboratorio, sala: e.target.value })}>
                                <option value="">Laboratórios</option>
                                <option value="01">sala 01</option>
                                <option value="02">sala 02</option>
                                <option value="03">sala 03</option>
                                <option value="04">sala 04</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label htmlFor="andar" className="form-label" style={{ color: 'black' }}>Escolha o Andar</label>
                            <select id="andar" className="form-select" style={{ color: 'black' }} value={laboratorio.andar || ''} onChange={(e) => setLaboratorio({ ...laboratorio, andar: e.target.value })}>
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
                            <button type="button" className="btn btn-danger">
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
