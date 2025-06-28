import { useNavigate } from "react-router-dom";
import css from "./Login.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { LoginModal } from "../Components/LoginModal";

const schemaLogin = z.object({
    username: z.string()
        .min(1, "Digite um nome, por favor."),
    password: z.string()
        .min(8, "A senha tem que ter no mínimo 8 caracteres.")
})

export function Login() {
    const [erro, setErro] = useState("");
    const [login, setLogin] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaLogin)
    })

    async function obter_dados_login(data) {
        try {
            const response = await axios.post("http://127.0.0.1:8000/smartcity/login/", {
                username: data.username,
                password: data.password,
            });

            const { access, refresh, usuario } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("id_usuario", usuario.id);
            localStorage.setItem("username", usuario.Nome);
            localStorage.setItem("funcao", usuario.Função);

            setLogin(true);
        }
        catch(error) {
            console.log(error.response?.data);
            
            setErro("Usuário não cadastrado no sistema.");

            alert("Usuário não cadastrado no sistema.");
        }
    }

    const navigate = useNavigate();

    return (
        <main className={css.container}>
            <section className={css.formularioLogin}>
                <h1>Olá, seja bem vindo(a) à SmartLucas!!!</h1>
                <form onSubmit={handleSubmit(obter_dados_login)}>
                    <label 
                        htmlFor="username">
                        Nome:
                    </label> <br />
                    <input 
                        type="text" 
                        name="username" 
                        id="nome" 
                        placeholder="Digite seu nome aqui"
                        {...register("username")}
                    /> <br />
                    {errors.username && <p>{"Aviso"}: {errors.username.message}</p>}

                    <label 
                        htmlFor="senha"
                    >
                        Senha:
                    </label> <br />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        placeholder="Digite sua senha aqui"
                        {...register("password")}
                    /> <br />
                    {errors.password && <p>{"Aviso"}: {errors.password.message}</p>}

                    <p className={css.fazerCadastro}>Ainda não possui uma conta? Faça seu cadastro <u onClick={() => navigate("/cadastro")} style={{ cursor:"pointer" }}>aqui!</u></p>

                    <div className={css.botao}>
                        <button type="submit" onClick={() => navigate("/")}>Entrar</button>
                    </div> 
                    {login && <LoginModal openModal={login} closeModal={() => setLogin(false)}/>}
                </form>
            </section>
        </main>
    )
}