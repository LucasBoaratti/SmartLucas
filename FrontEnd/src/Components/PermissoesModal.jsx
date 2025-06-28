import { useNavigate } from "react-router-dom";
import css from "./PermissoesModal.module.css";

export function PermissoesModal({ openModal, closeModal }) { 
    if(!openModal) {
        return null;
    } 

    const navigate = useNavigate();

    return (
        <main className={css.containerModal}>
            <section className={css.modal}>
                <p>Ops! Você não tem permissão para acessar essa página :(</p>
                <div className={css.botao}>
                    <button 
                        type="button" 
                        onClick={() => navigate("/sensores")}>
                        Voltar
                    </button>
                </div>
            </section>
        </main>
    )
}