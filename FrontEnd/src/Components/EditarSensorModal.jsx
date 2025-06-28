import { useNavigate } from "react-router-dom";
import css from "./CadastroModal.module.css";

export function EditarSensorModal({ openModal, closeModal }) { 
    if(!openModal) {
        return null;
    } 

    const navigate = useNavigate();

    return (
        <main className={css.containerModal}>
            <section className={css.modal}>
                <h1>Sensor editado com sucesso!</h1>
                <div className={css.botao}>
                    <button 
                        type="button" 
                        onClick={() => navigate("/sensores")}>
                        Avançar
                    </button>
                </div>
            </section>
        </main>
    )
}