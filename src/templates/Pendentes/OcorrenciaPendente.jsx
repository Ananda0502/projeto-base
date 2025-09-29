import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import OcorrenciasService from "../../services/OcorrenciasServices";

const OcorrenciaPendente = () => {
    const [ocorrencias, setOcorrencias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        OcorrenciasService.getPendentes()
            .then(res => setOcorrencias(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header goto={'/home'} title={'Pendentes'} logo={logo} />
                <section className="p-2 m-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Localidade</th>
                                    <th>Status</th>
                                    <th>Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocorrencias.map(o => (
                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.dataOcorrencia}</td>
                                        <td>{o.descricao}</td>
                                        <td>{o.localidade?.nome}</td>
                                        <td>{o.statusOcorrencia}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => navigate(`/pendentever/${o.id}`)}>Abrir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OcorrenciaPendente;
