import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useState } from "react";
import LaboratorioService from "../../services/LaboratorioService";



const LaboratoriosLista = () => {
    const [laboratorios, setLaboratorios] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        LaboratorioService.getAllLaboratorios().then(
            (response) => {
                const laboratorios = response.data;
                setLaboratorios(laboratorios);
                console.log(laboratorios); // Verifique se os dados estão sendo exibidos no console
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const getId = (id) => {
        navigate(`/laboratorioeditar/${id}`);
    };
    

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
                            </thead>
                            <tbody>
                                {laboratorios?.map((laboratorio) => (
                                    <tr className="" key={laboratorio.id}>
                                        <td>{laboratorio.id}</td>
                                        <td>{laboratorio.sala}</td> 
                                        <td>{laboratorio.andar}</td> 
                                        <td>
                                            <button onClick={() => getId(laboratorio.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Editar</i>
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

export default LaboratoriosLista;
