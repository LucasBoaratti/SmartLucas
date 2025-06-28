import { useNavigate } from "react-router-dom";
import Logo from "../assets/Images/SmartCity.png";
import css from "./Cabecalho.module.css";

export function Cabecalho() {
    const navigate = useNavigate();

    const nome = localStorage.getItem("username");

    const funcao = localStorage.getItem("funcao");

    return (
        <header>
            <section className={css.cabecalho}>
                <img src={Logo} alt="Logomarca do site com um fundo verde, um sensor marcando 19 graus e o nome do site." />
                <div className={css.barraNavegacao}>
                    <div className={css.home} onClick={() => navigate("/home")}>
                        <i class="bi bi-house-door-fill"></i>
                        <p>Home</p>
                    </div>
                    <div className={css.sensores} onClick={() => navigate("/sensores")}>
                        <i class="bi bi-broadcast"></i>
                        <p>Sensores</p>
                    </div>
                    <div className={css.login} onClick={() => navigate("/")}>
                        <i class="bi bi-person-fill"></i>
                        <p>Login</p>
                    </div>
                </div>
                <div className={css.perfil}>
                    <h2>Perfil ativo:</h2>
                    <p>{nome}</p>
                    <p>{funcao}</p>
                </div>
            </section>
        </header>
    )
}