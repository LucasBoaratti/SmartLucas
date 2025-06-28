import axios from "axios";
import css from "./Sensores.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeletarSensorModal } from "../Components/DeletarSensorModal";
import { Permissoes } from "../Components/Permissoes";

export function Sensores() {
     const [erro, setErro] = useState();
     const [sensor, setSensor] = useState([]);
     const [deletarSensor, setDeletarSensor] = useState(false);
     const [modalPermissao, setModalPermissao] = useState(false);

     const navigate = useNavigate();

     async function obter_dados_sensores() {
          const token = localStorage.getItem("access_token");

          if(!token) {
               setErro("Token não encontrado.");
          }

          try {   
               const response = await axios.get("http://127.0.0.1:8000/smartcity/sensor/", {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    }
               });

               setSensor(response.data);
          } 
          catch(error) {
               setErro("Erro ao capturar dados do login.");
          }   
     }

     useEffect(() => {
          obter_dados_sensores();
     })
     
     return (
          <main className={css.dadosSensores}>
               <h1>Dados dos sensores</h1>
               <div className={css.botoes}>
                    <div className={css.botaoAdicionar}>
                         <button type="button" onClick={() => navigate("/criarSensor")}>
                              <i class="bi bi-plus-lg"></i>
                              <p className={css.paragrafoBotao}>Adicionar sensor</p>
                         </button>
                    </div>
                    <div className={css.botaoVoltar} onClick={() => navigate("/home")}>
                         <button type="button">
                              <i class="bi bi-chevron-left"></i>
                              <p className={css.paragrafoBotao}>Voltar</p>
                         </button>
                    </div>
               </div>
               <section className={css.secaoTabela}>
                    <table className={css.tabela}>
                         <thead> 
                              <tr>
                                   <th>ID</th>
                                   <th>Sensor</th>
                                   <th>Mac_Address</th>
                                   <th>Unidade de medida</th>
                                   <th>Latitude</th>
                                   <th>Longitude</th>
                                   <th>Status</th>
                                   <th>Ações</th>
                              </tr>
                         </thead>
                         <tbody>
                         {sensor.map((sensor) => (
                              <tr key={sensor.id}>
                                   <td>{sensor.id}</td>
                                   <td>{sensor.sensor}</td>
                                   <td>{sensor.mac_address}</td>
                                   <td>{sensor.unidade_med}</td>
                                   <td>{sensor.latitude}</td>
                                   <td>{sensor.longitude}</td>
                                   <td>{sensor.status ? "Ativo" : "Inativo"}</td>
                                   <td>
                                        <div className={css.alinharIcones}>
                                             <i class="bi bi-pencil-square" onClick={() => {
                                                  localStorage.setItem("id", sensor.id);
                                                  navigate("/editarSensor");
                                             }}>
                                             </i>
                                             <i class="bi bi-trash" onClick={() => {
                                                  localStorage.setItem("id", sensor.id);
                                                  setDeletarSensor(true);
                                             }}>
                                             </i>
                                             <DeletarSensorModal openModal={deletarSensor} closeModal={() => setDeletarSensor(false)} atualizarTabela={obter_dados_sensores}/>
                                        </div>
                                   </td>
                              </tr>
                         ))}
                         </tbody>
                    </table>
               </section>
               <p className={css.historicoSensores} onClick={() => navigate("/filtros")}>Ficou curioso para ver os dados de outros sensores? Veja o <u>histórico de sensores.</u></p>
          </main>
     )
}