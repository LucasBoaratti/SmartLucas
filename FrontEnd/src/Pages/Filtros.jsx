import { useState } from "react";
import css from "./Filtros.module.css";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaFiltros = z.object({
    sensor: z.enum(["temperatura", "contador", "luminosidade", "umidade"]),
    timestamp: z.string()
    .refine((data) => {
        const novaData = new Date();
        const dataAtual = new Date(data);
        return dataAtual <= novaData
    }, {
        message: "A data do sensor não pode ser depois da data de agora.",
    })
})

export function Filtros() {
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaFiltros)
    })

    const [tabela, setTabela] = useState(false);
    const [erro, setErro] = useState();
    const [dadosSensores, setDadosSensores] = useState([]);

    function URLSensores(sensores) {
        switch(sensores) {
            case "temperatura":
                return "http://127.0.0.1:8000/smartcity/buscarSensorTemperaturaRegistrado/";
            case "contador":
                return "http://127.0.0.1:8000/smartcity/buscarSensorContagemRegistrado/";
            case "luminosidade":
                return "http://127.0.0.1:8000/smartcity/buscarSensorLuminosidadeRegistrado/";
            case "umidade":
                return "http://127.0.0.1:8000/smartcity/buscarSensorUmidadeRegistrado/";
            default:
                return null;
        }
    }

    async function obter_dados_sensores(data) {
        const urls = URLSensores(data.sensor);

        if(!urls) {
            setErro("URL não encontrada.");

            return;
        }

        setDadosSensores([]);
        setTabela(false);
        setErro(null);

        const token = localStorage.getItem("access_token");

        try {
            const response = await axios.post(urls, { 
                timestamp: data.timestamp, 
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            setDadosSensores(response.data);

            setTabela(true);
        }

        catch(error) {
            setErro("Erro ao buscar a url.");
        }
    }   

    return (
        <main className={css.container}>
            <h1>Dados dos sensores</h1>
            <section className={css.formularioBusca}>
                <h2>Busque aqui o sensor e seu dia específico</h2>
                <form onSubmit={handleSubmit(obter_dados_sensores)}>
                    <label htmlFor="sensores">Sensor:</label>
                    <select 
                        name="sensores" 
                        id="sensores" 
                        onChange={() => {
                            setTabela(false);
                            setDadosSensores([]);
                            setErro(null);
                        }}
                        {...register("sensor")}>
                        <option value="temperatura">Temperatura</option>
                        <option value="contador">Contador</option>
                        <option value="luminosidade">Luminosidade</option>
                        <option value="umidade">Umidade</option>
                    </select> <br />
                    {errors.sensor && <p>{errors.sensor.message}</p>}

                    <label htmlFor="data">Data:</label> <br />
                    <input 
                        type="date" 
                        name="data" 
                        id="data" 
                        placeholder="Escolha a data"
                        {...register("timestamp")}/>
                    {errors.timestamp && <p>{errors.timestamp.message}</p>}
                    
                    <div className={css.botao}>
                        <button type="submit">Buscar</button>
                    </div>
                </form>               
            </section>
            {tabela && (
                <section>
                    <table className={css.tabela}>
                        <thead>
                            <tr>
                                <th>Sensor</th>
                                <th>Mac Address</th>
                                <th>Unidade de medida</th>
                                <th>Valor</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Status</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dadosSensores.map((dadosSensores) => (
                            <tr key={dadosSensores.id || dadosSensores.sensor}>
                                <td>{dadosSensores.sensor}</td>
                                <td>{dadosSensores.mac_address}</td>
                                <td>{dadosSensores.unidade_medida}</td>
                                <td>{dadosSensores.valor}</td>
                                <td>{dadosSensores.latitude}</td>
                                <td>{dadosSensores.longitude}</td>
                                <td>{dadosSensores.status}</td>
                                <td>{dadosSensores.timestamp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    )
}