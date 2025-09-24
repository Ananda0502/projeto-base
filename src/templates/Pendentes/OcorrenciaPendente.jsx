import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import OcorrenciasService from "../../services/OcorrenciasServices"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

const ocorrenciaPendente = () => {

    const navigate = useNavigate();

    const _dbRecords = useRef(true);

    const [ocorrencias, setOcorrencias] = useState([]);

    const getId = (id) => {
        navigate(`/pendentever/${id}`)
    }

    useEffect(() => {
        if (_dbRecords.current) {
            OcorrenciasService.getAllOcorrencias().then(
                (response) => {
                    const ocorrencias = response.data;
                    setOcorrencias(ocorrencias);
                }
            ).catch((error) => {
                setOcorrencias([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);
    return (
        <div className=" corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={'Pendentes'}
                    logo={logo}
                />
                <section className="p-2 m-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Localidade</th>
                                     <th scope="col">Status</th>
                                    <th scope="col">Visualizar </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ocorrencias?.map((ocorrencia) => (
                                    <tr key={ocorrencia.id}>
                                        <td scope="row">{ocorrencia.id}</td>
                                        <td>{ocorrencia.dataOcorrencia}</td>
                                        <td>{ocorrencia.descricao}</td>
                                        <td>{ocorrencia.localidade.nome}</td>
                                        <td>{ocorrencia.statusOcorrencia}</td>
                                        <td>
                                            <button type="button" onClick={() => getId(ocorrencia.id)}
                                                className="btn btn-sm btn-warning mx-1">
                                                <i className="bi bi-envelope-open me-2"></i>Abrir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                </section>
            </div>
        </div>
    )
}

export default ocorrenciaPendente