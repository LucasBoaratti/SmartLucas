import css from "./CriarSensorModal.module.css";
import { useNavigate } from "react-router-dom";

export function CriarSensorModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;
    }

    const navigate = useNavigate();
    
    return (
        <main className={css.containerModal}>
            <section className={css.modal}>
                <h1>Sensor criado com sucesso!</h1>
                <div className={css.botao}>
                    <button type="button" onClick={() => navigate("/sensores")}>Avançar</button>
                </div>
            </section>
        </main>
    )
}