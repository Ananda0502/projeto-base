import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import LaboratorioService from "../../services/LaboratorioService";

const LaboratorioNovo = () => {
    const navigate = useNavigate();

    const [laboratorios, setLaboratorios] = useState([]);
    const [sala, setSala] = useState('');
    const [andar, setAndar] = useState('');

    useEffect(() => {
        // Buscar todos os laboratórios ao carregar a página
        LaboratorioService.getAllLaboratorios().then(
            (response) => {
                setLaboratorios(response.data);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar se já existe um laboratório com a mesma sala e andar
        const laboratorioExistente = laboratorios.find(lab => lab.sala === sala && lab.andar === andar);

        if (laboratorioExistente) {
            alert("Já existe um laboratório cadastrado com essa sala e andar.");
            return;
        }

        // Criação do novo laboratório
        const novoLaboratorio = { sala, andar };

        try {
            // Enviar os dados ao backend
            await LaboratorioService.saveLaboratorio(novoLaboratorio);
            alert("Laboratório cadastrado com sucesso!");
            navigate("/laboratorioslista"); // Redirecionar para a lista de laboratórios
        } catch (error) {
            console.error("Erro ao cadastrar o laboratório:", error);
            alert("Erro ao cadastrar o laboratório!");
        }
    };

    return (
        <div className="corpo d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/laboratorio'}
                    title={'Novo Laboratório'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-2">
                            <label htmlFor="inputSala" className="form-label">Escolha a Sala</label>
                            <select id="inputSala" className="form-select" value={sala} onChange={(e) => setSala(e.target.value)} required>
                                <option value="" disabled>Laboratórios</option>
                                <option value="01">Sala 01</option>
                                <option value="02">Sala 02</option>
                                <option value="03">Sala 03</option>
                                <option value="04">Sala 04</option>
                            </select>
                        </div>
                       
                        <div className="col-md-2">
                            <label htmlFor="inputAndar" className="form-label">Escolha o Andar</label>
                            <select id="inputAndar" className="form-select" value={andar} onChange={(e) => setAndar(e.target.value)} required>
                                <option value="" disabled>Andares</option>
                                <option value="1">1° andar</option>
                                <option value="2">2° andar</option>
                                <option value="3">3° andar</option>
                                <option value="4">4° andar</option>
                            </select>
                        </div>
                        
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default LaboratorioNovo;
