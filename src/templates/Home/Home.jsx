import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const Home = () => {

    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
                <Header 
                    goto={'/home'}
                    title={'Home'}
                    logo={logo}
                    />
                <h1 id="saudacoes"> BEM VINDO AO OPS! </h1>
           </div>
        </div>
    )
}

export default Home