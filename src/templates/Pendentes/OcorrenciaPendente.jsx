import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar'; // O Sidebar está aqui
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
        // Mantido o layout d-flex, confiando no CSS do Sidebar para telas pequenas
        <div className="corpo d-flex"> 
            
            {/* O Sidebar está sendo renderizado e precisa ser ajustado internamente para telas mobile. */}
            <Sidebar />
            
            <div className="p-3 w-100">
                <Header goto={'/home'} title={'Pendentes'} logo={logo} />
                <section className="p-2 m-2 shadow-lg">
                    
                    {/* Habilita rolagem horizontal para a tabela */}
                    <div className="table-wrapper table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {/* Oculta ID e Localidade no celular */}
                                    <th className="d-none d-md-table-cell">ID</th>
                                    <th>Data</th>
                                    <th className="d-none d-md-table-cell">Descrição</th> 
                                    <th className="d-none d-md-table-cell">Localidade</th>
                                    <th>Status</th>
                                    <th>Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocorrencias.map(o => (
                                    <tr key={o.id}>
                                        {/* Oculta as células correspondentes no celular */}
                                        <td className="d-none d-md-table-cell">{o.id}</td>
                                        <td>{o.dataOcorrencia}</td>
                                        <td className="d-none d-md-table-cell">{o.descricao}</td>
                                        <td className="d-none d-md-table-cell">{o.localidade?.nome}</td>
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