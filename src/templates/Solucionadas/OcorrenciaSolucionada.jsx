import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const OcorrenciaSolucionada = () => {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/solucionadaLer')
    }

    const getId = (id) => {
        console.log("ID:", id);
    }
    return (
        <div className=" corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/home'}
                    title={' Solucionadas'}
                    logo={logo}
                />

                
                <section className="p-2 m-2 shadow-lg">

                    <div className="table-wrapper">
                    <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Visualizar </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">1</td>
                                    <td>10/10</td>
                                    <td>13:20</td>
                                    <td>
                                        <button type="button" onClick={() => goTo()}
                                                className="btn btn-sm btn-warning">
                                            <i className="bi bi-envelope-open me-2"></i>Abrir
                                        </button>
                                    </td>

                                </tr>
                            </tbody>
                            <tbody>
                               <tr>
                                   <td scope="row">2</td>
                                   <td>05/10</td>
                                   <td> 16:45</td>
                                   <td>
                                       <button type="button" onClick={() => goTo()}
                                               className="btn btn-sm btn-warning">
                                           <i className="bi bi-envelope-open me-2"></i>Abrir
                                       </button>
                                   </td>

                               </tr>
                           </tbody>
                        </table>
                    </div>


                </section>
            </div>
        </div>
    )
}

export default OcorrenciaSolucionada