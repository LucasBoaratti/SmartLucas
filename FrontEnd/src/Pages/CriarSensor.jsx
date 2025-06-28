import { useForm } from "react-hook-form";
import css from "./CriarSensor.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { CriarSensorModal } from "../Components/CriarSensorModal";

const schemaPOSTSensor = z.object({
     sensor: z.enum(["Temperatura", "Umidade", "Luminosidade", "Contagem"]),
     mac_address: z.string()
          .regex(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, {
               message: "Formato inválido. Exemplo de formato: 00:1A:2B:3C:4D:5E",
          }),
     unidade_med: z.enum(["°C", "%", "lux", "uni"]),
     latitude: z.number()
          .min(-90, "A latitude não pode ser menor que -90 graus.")
          .max(90, "A latitude não pode ser maior que 90 graus."),
     longitude: z.number()
          .min(-180, "A longitude não pode ser menor que -180 graus.")
          .max(180, "A longitude não pode ser maior que 180 graus."),
     status: z.enum(["True", "False"]),
}) 

export function CriarSensor() {
     const [erro, setErro] = useState();
     const [postSensor, setPostSensor] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors }
     } = useForm({
          resolver: zodResolver(schemaPOSTSensor)
     })

     async function criar_sensor(data) {
          const dados = {
               ...data,
          }

          const token = localStorage.getItem("access_token");

          if(!token) {
               setErro("Token não encontrado.");
          }

          try {
               await axios.post("http://127.0.0.1:8000/smartcity/sensor/", dados, {
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         "Content-Type": "application/json",
                    }
               })

               setPostSensor(true);
          }
          catch(error) {
               setErro("Erro ao criar sensor.", error);
          }
     }

     return (
          <main className={css.container}>
               <h1>Cadastre seu sensor aqui</h1>
               <section className={css.formularioSensor}> 
                    <form onSubmit={handleSubmit(criar_sensor)}>
                         <h2>Cadastro de sensor</h2>
                         <label htmlFor="sensor">Sensor:</label> 
                         <select name="sensor" id="sensor" {...register("sensor")}>
                              <option value="Temperatura">Temperatura</option>
                              <option value="Umidade">Umidade</option>
                              <option value="Luminosidade">Luminosidade</option>
                              <option value="Contagem">Contagem</option>
                         </select> <br />                         
                         {errors.sensor && <p>{errors.sensor.message}</p>}

                         <label htmlFor="mac_address">Mac Address:</label> <br />
                         <input 
                              type="text" 
                              name="mac_address" 
                              id="macAddress"
                              placeholder="Ex: 00:1A:2B:3C:4D:5E" 
                              {...register("mac_address")}
                         /> <br />
                         {errors.mac_address && <p>{errors.mac_address.message}</p>}

                         <label htmlFor="unidadeMedida">Unidade de medida:</label>   
                         <select 
                              name="unidadeMedida" 
                              id="unidadeMedida" 
                              {...register("unidade_med")}>
                              <option value="°C">°C</option>
                              <option value="%">%</option>
                              <option value="lux">lux</option>
                              <option value="uni">uni</option>
                         </select> <br />                         
                         {errors.unidade_med && <p>{errors.unidade_med.message}</p>}

                         <label htmlFor="latitude">Latitude:</label> <br />   
                         <input 
                              type="text" 
                              name="latitude" 
                              id="latitude" 
                              placeholder="Ex: -43.55"
                              {...register("latitude", {valueAsNumber: true})}
                         /> <br />
                         {errors.latitude && <p>{errors.latitude.message}</p>}

                         <label htmlFor="longitude">Longitude:</label> <br />
                         <input 
                              type="text" 
                              name="longitude" 
                              id="longitude" 
                              placeholder="Ex: 26.42"
                              {...register("longitude", {valueAsNumber: true})}
                         /> <br />
                         {errors.longitude && <p>{errors.longitude.message}</p>}

                         <label htmlFor="status">Status:</label> 
                         <select 
                              name="status" 
                              id="status" 
                              {...register("status")}>
                              <option value="True">True (Ativo)</option>
                              <option value="False">False (Inativo)</option>
                         </select>
                          <br />
                         {errors.status && <p>{errors.status.message}</p>}
                         
                         <div className={css.botao}>
                              <button type="submit">Cadastrar</button>
                         </div>
                         <CriarSensorModal openModal={postSensor} closeModal={() => setPostSensor(false)}/>
                    </form> 
               </section>
          </main>
     )
}