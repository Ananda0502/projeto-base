import { Link, useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import UsuarioService from "../../services/UsuarioService"

const UsuarioEditar = () => {

    const { id } = useParams();
    const _dbRecords = useRef(true);

    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        UsuarioService.getById(id).then(
            (response) => {
                const usuario = response.data;
                setUsuario(usuario);
                console.log(usuario);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Editar Laboratório'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-3">
                        
                    <div className="col-md-2">
                            <label htmlFor="inputAcesso" id="lab" className="form-label">Escolha a Sala</label>
                            <select id="inputAcesso" className="form-select">
                                <option selected>Laboratórios</option>
                                <option>sala 01</option>
                                <option>sala 02</option>
                                <option>sala 03</option>
                                <option>sala 04</option>
                            </select>
                        </div>
                       
                        <div className="col-md-2">
                            <label htmlFor="inputAcesso" id="andar" className="form-label">Escolha o Andar</label>
                            <select id="inputAcesso" className="form-select">
                                <option selected>Andares</option>
                                <option>1°andar</option>
                                <option>2°andar </option>
                                <option>3°andar</option>
                                <option>4°andar</option>
                            </select>
                        </div>
                        
                        <div className="col-12 d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">
                                Salvar Alterações
                            </button>

                            <button type="button" className="btn btn-danger">
                                Excluir Laboratório
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default UsuarioEditar