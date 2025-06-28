import { useNavigate } from "react-router-dom";
import css from "./DeletarSensorModal.module.css";
import { useState } from "react";
import axios from "axios";

export function DeletarSensorModal({ openModal, closeModal, atualizarTabela }) { 
    if(!openModal) {
        return null;
    } 

    const [erro, setErro] = useState();

    const navigate = useNavigate();

    async function deletar_sensor() {
        const id = localStorage.getItem("id");

        const token = localStorage.getItem("access_token");

        if(!token) {
            setErro("Token não encontrado.");
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/smartcity/sensor/${id}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }   
            });

            alert("Sensor deletado com sucesso!");

            closeModal();

            atualizarTabela();

            navigate("/sensores");
        }
        catch(error) {
            setErro("Erro ao deletar sensor.", error);
        }
    }

    return (
        <main className={css.containerModal}>
            <section className={css.modal}>
                <p>Tem certeza que deseja deletar esse sensor?</p> 
                <div className={css.botao}>
                    <button 
                        type="submit" 
                        onClick={deletar_sensor}>
                        Sim
                    </button>
                    <button 
                        type="button"
                        onClick={closeModal}>
                        Não
                    </button>
                </div>
            </section>
        </main>
    )
}