import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import LaboratorioService from "../../services/LaboratorioService"
import { useEffect, useState } from "react"

const LaboratoriosLista = () => {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/laboratorioeditar')
    }

    const [laboratorios, setLaboratorios] = useState([]);

    useEffect(() => {
        LaboratorioService.getAllLaboratorios().then(
            (response) => {
                const laboratorios = response.data;
                setLaboratorios(laboratorios);
                console.log(laboratorios);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const getId = (id) => {
        navigate(`/laboratorioeditar/` + id)
    }

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/laboratorio'}
                    title={'Lista de Laboratórios'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID LABORATÓRIO:</th>
                                    <th scope="col">SALA:</th>
                                    <th scope="col">ANDAR:</th>
                                    <th scope="col">EDITAR:</th>
                                </tr>

                                <tr>
                                   <td scope="row">1</td>
                                   <td>01</td>
                                   <td>01</td>
                                   <td>
                                   <button onClick={() => getId(laboratorios.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Editar</i>
                                            </button>
                                   </td>

                               </tr>

                               <tr>
                                   <td scope="row">2</td>
                                   <td>03</td>
                                   <td>02</td>
                                   <td>
                                   <button onClick={() => getId(laboratorios.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Editar</i>
                                            </button>
                                   </td>

                               </tr>

                               <tr>
                                   <td scope="row">3</td>
                                   <td>04</td>
                                   <td>03</td>
                                   <td>
                                   <button onClick={() => getId(laboratorios.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Editar</i>
                                            </button>
                                   </td>

                               </tr>

                               <tr>
                                   <td scope="row">4</td>
                                   <td>04</td>
                                   <td>02</td>
                                   <td>
                                   <button onClick={() => getId(laboratorios.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Editar</i>
                                            </button>
                                   </td>

                               </tr>
                                
                            </thead>
                            <tbody>
                                {laboratorios?.map((laboratorio) => (
                                    <tr className="" key={laboratorio.idlab}>
                                        <td>{laboratório.id}</td>
                                        <td>
                                            <button onClick={() => getId(laboratorio.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Abrir</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LaboratoriosLista