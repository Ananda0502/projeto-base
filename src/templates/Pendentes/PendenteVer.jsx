import { Link, useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useRef } from "react"
import OcorrenciasService from "../../services/OcorrenciasServices"
import { useState } from "react"
import { useEffect } from "react"

const PendenteVer = () => {

    const { id } = useParams();
    const _dbRecords = useRef(true);

    const objectState = {
        id: null,
        descricao: "",
        dataOcorrencia: "",
        usuario: {
            id: null
        },
        localidade: {
            id: null
        },
        statusOcorrencia: ""
    };

    const [ocorrencia, setOcorrencia] = useState(objectState);

     useEffect(() => {
        if (_dbRecords.current) {
            OcorrenciasService.getById(id)
                .then(response => {
                    const ocorrencia = response.data;
                    setOcorrencia(ocorrencia);
                    console.log(ocorrencia);
                })
                .catch(e => {
                    console.log(e);
                });
        } return () => {
            _dbRecords.current = false;
        }
    }, [id]);

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/ocorrenciaPendente'}
                    title={'Informações da Ocorrência'}
                    logo={logo}
                />
                <section className="fundo m-2 p-2 shadow-lg">
                    <form className="mx-5 p-2 border">
                        <div className="row my-3 g-1">
                            <label htmlFor="inputID" className="col-md-1 col-form-label">ID:</label>
                            <div className="col-md-2">
                                <input type="text" className="form-control" id="inputID" readOnly />
                            </div>

                            <label htmlFor="inputData" className="col-md-2 col-form-label">Data:</label>
                            <div className="col-md-3">
                                <input type="text" className="form-control" id="inputData" readOnly />
                            </div>

                            <label htmlFor="inputStatus" className="col-md-2 col-form-label">Status:</label>
                            <div className="col-md-2">
                                <input type="text" className="form-control" id="inputStatus" readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="inputEmail" className="col-md-2 col-form-label">RM:</label>
                            <div className="col-md-10">
                                <input type="email" className="form-control" id="inputEmail" readOnly />
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="inputTexto" className="form-label">Descrição:</label>
                            <textarea rows={5} className="form-control" id="inputTexto" >
                            </textarea>
                        </div>


                        <div className="col-12 d-flex justify-content-around">

                            <button type="submit" className="btn btn-danger" id="marcar">
                                Marcar como <br />solucionada
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default PendenteVer