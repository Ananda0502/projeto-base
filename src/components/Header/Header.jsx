import { Link } from "react-router-dom";
import './Header.css';

const Header = ({goto, title, logo}) => {

    return (
        <div id="caixaemcima" className="d-flex justify-content-between align-content-center p-3 border-bottom shadow rounded">
            <Link id="botaovoltar" to={goto} className="btn btn-info shadow">Voltar</Link>
            <div>
                <span className="fw-bold h2" id="titulo">{title}</span>
            </div>
            <div>
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default Header