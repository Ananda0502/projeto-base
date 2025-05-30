import { Link, useParams } from "react-router-dom";
import './Sidebar.css';
import logo from '../../assets/images/system-logo_24_x_24.png';

const Sidebar = () => {

    return (
        <div className="sidebar" >
            <div className="d-flex justify-content-around align-items-center px-2 py-4 border-bottom rounded" >
                <img src={logo} alt="logo" className="m-1" />
                <div id="retornalogin"><Link className="nav-link" to={'/Login'} id="retornalogin"><b>Sair</b></Link></div>


            </div>


            <nav className="nav flex-column">
                <div id="navhome"> <Link className="nav-link" aria-current="page" to={'/home'}>Home</Link> </div>
                <div id="navocorrencias"> <Link className="nav-link" to={'/ocorrencias'} id="navocorrencias">Ocorrências</Link> </div>
                <div id="navpendentes"> <Link className="nav-link" to={'/ocorrenciaPendente'} id="navpendentes">Pendentes</Link> </div>
                <div id="navsolucionadas"> <Link className="nav-link" to={'/ocorrenciaSolucionada'} id="navsolucionadas">Solucionadas</Link> </div>
                <div id="navlaboratorios"> <Link className="nav-link" to={'/laboratorio'} id="navlaboratorios">Laboratórios</Link> </div>
            </nav>
    
        </div>
        
    )
}

export default Sidebar