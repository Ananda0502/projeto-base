import { Link } from "react-router-dom";
import './Sidebar.css';
import logo from '../../assets/images/system-logo_24_x_24.png';

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="d-flex justify-content-around align-items-center px-2 py-4 border-bottom rounded">
                <img src={logo} alt="logo" className="m-1" />
                <span className="fw-bold fst-italic">Perfil</span>
            </div>

            <nav className="nav flex-column">
                <Link className="nav-link" aria-current="page" to={'/home'}>Home</Link>
                <Link className="nav-link" to={'/mensagem'}>Pendentes</Link>
                <Link className="nav-link" to={'/usuario'}>Solucionadas</Link>
            </nav>
        </div>
    )
}

export default Sidebar