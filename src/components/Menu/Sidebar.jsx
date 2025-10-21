import { Link } from "react-router-dom";
import './Sidebar.css';
import logo from '../../assets/images/system-logo_24_x_24.png';

const Sidebar = () => {

    return (
        <div className="sidebar" >
            
            {/* ... Header e Logo ... */}
            <div className="sidebar-header d-flex justify-content-around align-items-center px-3 py-4 border-bottom" >
                
                <Link to="/home" className="logo-link"> 
                    <img src={logo} alt="logo" className="sidebar-logo" />
                </Link>

                <div id="retornalogin">
                    <Link className="nav-link" to={'/Login'}><b>Sair</b></Link>
                </div>
            </div>

            <nav className="nav flex-column py-3">
                
                <Link className="sidebar-link" to={'/home'}>Home</Link> 
                <Link className="sidebar-link" to={'/ocorrencias'}>Ocorrências</Link> 
                
                {/* CORREÇÃO: O link agora é '/ocorrenciaPendente' para bater com o AppRoutes.jsx */}
                <Link className="sidebar-link status-pendente" to={'/ocorrenciaPendente'}>Pendentes</Link> 
                
                <Link className="sidebar-link status-solucionada" to={'/ocorrenciaSolucionada'}>Solucionadas</Link> 

            </nav>
        
        </div>
        
    )
}

export default Sidebar;