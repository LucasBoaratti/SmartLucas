import { useNavigate } from "react-router-dom";
import css from "./CadastroModal.module.css";

export function CadastroModal({ openModal, closeModal }) {    
     if(!openModal) {
          return null;
     } 

     const navigate = useNavigate();

     return (
          <main className={css.containerModal}>
               <section className={css.modal}>
                    <h1>Cadastro salvo com sucesso! Realize seu login.</h1>
                    <div className={css.botao}>
                         <button 
                              type="button" 
                              onClick={() => navigate("/")}>
                              Login
                         </button>
                    </div>
               </section>
          </main>
     )
}