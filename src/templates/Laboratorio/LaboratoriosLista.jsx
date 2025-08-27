import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import LaboratorioService from "../../services/LaboratorioService";

const LaboratoriosLista = () => {
    const [localidades, setLocalidades] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const carregarLocalidades = () => {
        LaboratorioService.getAllLaboratorios().then(
            (response) => {
                setLocalidades(response.data);
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        carregarLocalidades();
    }, []);

    // Recarrega a lista quando voltar da página de edição, se veio com estado reload=true
    useEffect(() => {
        if (location.state?.reload) {
            carregarLocalidades();
            // limpa o estado para evitar loop
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    const getId = (id) => {
        navigate(`/laboratorioeditar/${id}`);
    };

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/laboratorio'}
                    title={'Lista de Localidades'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID Localidade</th>
                                    <th>Localidade</th>
                                    <th>Status</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localidades?.map((localidade) => (
                                    <tr key={localidade.id}>
                                        <td>{localidade.id}</td>
                                        <td>{localidade.nome}</td>
                                        <td>{localidade.statusLocal}</td>
                                        <td>
                                            <button onClick={() => getId(localidade.id)} className="btn btn-sm btn-warning rounded">
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {localidades.length === 0 && (
                                    <tr><td colSpan={4} className="text-center">Nenhuma localidade encontrada.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LaboratoriosLista;
