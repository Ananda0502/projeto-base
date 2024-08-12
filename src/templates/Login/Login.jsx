import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/system-logo_128_x_128.png';
import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    const goto = () => {
        navigate("/home");
    }

    const backto = () => {
        navigate("/");
    }


    return (
        <div className="container">
            <form action="" className="login-form" >
                <div className="login-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold"  id="rm" >RM:</label>
                    <input type="email" className="form-control text-center fw-medium shadow" />
                </div>
                <div>
                    <label htmlFor="password" className="form-label mb-0 fw-bold" id="senha">Senha:</label>
                    <input type="password"  className="form-control text-center fw-medium shadow" />
                </div>
                <div className="d-flex justify-content-center my-1 d-none" id="infos">
                    <p className="fw-bold fst-italic text-danger">
                        Dados Incorretos!!!
                    </p>
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <button className="btn btn-warning fw-medium shadow" id="cancelar" type="button"
                        onClick={backto}>Cancelar</button>
                    <button className="btn btn-success fw-medium shadow" id="entrar"type="submit"
                        onClick={goto} >Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default Login