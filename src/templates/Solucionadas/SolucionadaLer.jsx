import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import { useState, useEffect } from "react";
import OcorrenciasService from "../../services/OcorrenciasServices";

const SolucionadaLer = () => {
  const { id } = useParams();
  const [ocorrencia, setOcorrencia] = useState(null);

  useEffect(() => {
    if (id) {
      OcorrenciasService.getById(id)
        .then((response) => {
          setOcorrencia(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar ocorrência:", error);
        });
    }
  }, [id]);

  if (!ocorrencia) return <div>Carregando...</div>;

  return (
    <div className="corpo d-flex">
      <Sidebar />
      <div className="p-3 w-100">
        <Header
          goto={'/ocorrenciaSolucionada'}
          title={'Informações da Ocorrência'}
          logo={logo}
        />
        <section className="fundo m-2 p-2 shadow-lg">
          <form className="mx-5 p-2 border">
            <div className="row my-3 g-1">
              <label className="col-md-1 col-form-label">ID:</label>
              <div className="col-md-2">
                <input type="text" className="form-control" value={ocorrencia.id} readOnly />
              </div>

              <label className="col-md-2 col-form-label">Data:</label>
              <div className="col-md-3">
                <input type="text" className="form-control" value={new Date(ocorrencia.dataOcorrencia).toLocaleDateString()} readOnly />
              </div>

              <label className="col-md-2 col-form-label">Status:</label>
              <div className="col-md-2">
                <input type="text" className="form-control" value={ocorrencia.statusOcorrencia} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-2 col-form-label">RM:</label>
              <div className="col-md-10">
                <input type="text" className="form-control" value={ocorrencia.usuario?.rm} readOnly />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <label className="form-label">Descrição:</label>
              <textarea rows={5} className="form-control" value={ocorrencia.descricao} readOnly />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SolucionadaLer;
