import Logo from "../assets/Images/SmartCity.png";
import Lucas from "../assets/Images/Lucas.png";
import css from "./SobreNos.module.css";

export function SobreNos() {
     return (
          <main className={css.paragrafo}>
               <h1>Sobre nós e sobre o site</h1>
               <section className={css.informacoesSite}>
                    <img src={Logo} alt="Logomarca do site com um fundo verde, um sensor marcando 19 graus e o nome do site." />
                    <div className={css.sobreSite}>
                         <h2>Sobre o site</h2>
                         <p>Esse site foi criado por mim, Lucas Henrique, a partir de um projeto integrador que fazemos no fim de cada semestre na escola SENAI Roberto Mange, esse integrador tem o objetivo de mostrar todos os sensores da cidade SmartLucas, com os mesmos sendo monitorados pela cidade mais famosa da cidade: TechnoVile. Cada sensor tem a sua categoria, endereço MAC e muito mais.</p>
                    </div>
               </section>
               <section className={css.informacoesLucas}>
                    <div className={css.sobreMim}>
                         <h2>Sobre mim</h2>
                         <p>Olá, eu me chamo Lucas e tenho 20 anos. Eu gosto muito de front-end e de UX & UI, além disso na minha vida pessoal, eu gosto muito de gatos (inclusive tenho 3 em casa) e também gosto de jogar videogame e mexer no computador para jogar e programar. Sou uma pessoa muito tímida que não conversa muito com as outras pessoas tanto no SENAI quanto na Bosch e, falando em Bosch, meu objetivo é me formar na área de front-end ou de UI & UX (mesmo não tendo muita criatividade ;-;).</p>
                    </div>
                    <img src={Lucas} alt="Um garoto pensativo de cor de pele rosa com bochechas arosadas, um cabelo marrom e uma camiseta de manga longa azul escuro." />
               </section>
          </main>
     )
}