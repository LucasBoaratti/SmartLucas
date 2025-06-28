import css from "./Rodape.module.css";
import { useNavigate } from "react-router-dom";

export function Rodape() {
    const navigate = useNavigate();

    return (
        <footer>
            <section className={css.rodape}>
                <section className={css.direitosAutorais}>
                    <p>SmartLucas @2025, todos os direitos reservados.</p>
                    <div className={css.redesSociais}>
                        <a href="https://www.instagram.com/"><i class="bi bi-instagram"></i></a>
                        <a href="https://x.com/"><i class="bi bi-twitter"></i></a>
                        <a href="https://www.google.com/maps/place/Escola+e+Faculdade+de+Tecnologia+Senai+Roberto+Mange/@-22.9232503,-47.0679552,4039m/data=!3m1!1e3!4m6!3m5!1s0x94c8c8c794884427:0x15a2759628f243d1!8m2!3d-22.9140476!4d-47.0681209!16s%2Fg%2F1td7d7zd!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D"><i class="bi bi-pin-map-fill"></i></a>
                        <a href="https://discord.com/"><i class="bi bi-discord"></i></a>
                    </div>
                </section>
                <section className={css.contatos}>
                    <p className={css.contato}>Entre em contato</p>
                    <p>smartlucas@email.com</p>
                    <p>19 99999-9999</p>
                </section>
                <section className={css.links}>
                    <p className={css.link}>Outras páginas</p>
                    <p  onClick={() => navigate("/sobreNos")} className={css.sobreNos}>Sobre nós</p>
                </section>
                <section className={css.creditos}>
                    <p className={css.site}>Site desenvolvido por:</p>
                    <p className={css.pessoas}>Lucas Henrique Boaratti Silva, <br /> Prefeito da SmartLucas</p>
                </section>
            </section>
        </footer>
    )
}