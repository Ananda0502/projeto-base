import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const Laboratorio = () => {

    return (
        <div className="corpo d-flex">
           <Sidebar />
           <div className="p-3 w-100">
           <Header 
                    goto={'/home'}
                    title={'Laboratórios (Funcionalidade Desativada)'}
                    logo={logo}
                    />
               <section className="m-2 p-2 shadow-lg">
                    {/* Mensagem de desativação */}
                    <div className="alert alert-danger text-center" role="alert">
                        A gestão de laboratórios está temporariamente desativada.
                    </div>
                    {/* Links Desativados (Comentados)
                    <div className="d-flex justify-content-around">
                        <Link to={'/laboratorionovo'} 
                            className="btn btn-lg btn-primary" id="novo">
                            Novo Laboratório
                        </Link>
                        <Link to={'/laboratorioslista'} 
                            className="btn btn-lg btn-warning" id="lista">
                            Lista de Laboratórios
                        </Link>
                    </div>
                    */}
                </section>
           </div>
        </div>
    )
}

export default Laboratorio