import { useNavigate } from "react-router-dom";
import css from "./LoginModal.module.css";

export function LoginModal({ openModal, closeModal }) {
    if(!openModal) {
        return null;    
    }

    const navigate = useNavigate();

    return (
        <section className={css.containerModal}>
            <div className={css.modal}>
                <p>Login realizado com sucesso! Seja bem vindo(a) à SmartLucas.</p>
                <div className={css.botao}>
                    <button type="button" onClick={() => navigate("/home")}>Avançar</button>
                </div>
            </div> 
        </section>
    )
}