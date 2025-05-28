import { json, Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate(); 
    const usuarioLogado = JSON.parse(sessionStorage.getItem("tecnico"))
    
    useEffect(() => {
        if (!usuarioLogado) {
          navigate("/login"); // Redireciona se não estiver logado
        } else {
          console.log(usuarioLogado); // Só mostra se estiver logado
        }
      }, []);
      

    return (
        <div className=" corpo d-flex">
           <Sidebar />
           <div className="p-3 w-100">
            
                <Header
                    
                    goto={'/home'}
                    title={'Home'}
                    logo={logo}
                    />
                <h1 id="saudacoes"> BEM VINDO AO SISTEMA! {usuarioLogado?.rmtecnico}</h1>
           </div>
        </div>
    )
}

export default Home