import { useNavigate } from "react-router-dom";
import css from "./Cadastro.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useState } from "react";
import { CadastroModal } from "../Components/CadastroModal";

const schemaCadastro = z.object({
    username: z.string()
        .min(1, "Digite seu nome, por favor."),
    email: z.string(),
    password: z.string()
        .min(8, "A senha tem que possuir no mínimo 8 caracteres."),
    confirmarSenha: z.string()
        .min(8, "A senha tem que possuir no mínimo 8 caracteres."),
    funcao: z.enum(["Administrador", "Professor"]),
}).refine((data) => data.password === data.confirmarSenha, {
            message: "As senhas não coincidem.",
            path: ["confirmarSenha"],
})

export function Cadastro() {
    const [erro, setErro] = useState("");
    const [cadastro, setCadastro] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaCadastro)
    })

    const navigate = useNavigate();

    async function obter_dados_cadastro(data) {
        try {
            const response = await axios.post("http://127.0.0.1:8000/smartcity/cadastro/", {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmarSenha: data.confirmarSenha,
                funcao: data.funcao,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            setCadastro(true);
        }
        catch(error) {
            setErro("Erro ao cadastrar usuário.");
        }
    }

    return (
        <main className={css.container}>
            <section className={css.formularioCadastro}>
                <h1>Faça seu cadastro aqui na SmartLucas!!! </h1>
                <form onSubmit={handleSubmit(obter_dados_cadastro)}>
                    <label htmlFor="nome">Nome:</label> <br />
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome"
                        placeholder="Digite seu nome aqui" 
                        {...register("username")}
                    /> <br />
                    {errors.username && <p>{"Aviso"}: {errors.username.message}</p>}

                    <label htmlFor="email">E-mail:</label> <br />
                    <input 
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Digite seu E-Mail aqui" 
                        {...register("email")}
                    /> <br />
                    {errors.email && <p>{"Aviso"}: {errors.email.message}</p>}

                    <label htmlFor="senha">Senha:</label> <br />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha"
                        placeholder="Digite sua senha aqui" 
                        {...register("password")}
                    /> <br />
                    {errors.senha && <p>{"Aviso"}: {errors.senha.message}</p>}

                    <label htmlFor="confirmarSenha">Confirmar senha:</label> <br />
                    <input 
                        type="password" 
                        name="confirmarSenha"
                        id="confirmarSenha"
                        placeholder="Digite sua senha aqui"
                        {...register("confirmarSenha")}
                    /> <br />
                    {errors.confirmarSenha && <p>{"Aviso"}: {errors.confirmarSenha.message}</p>}

                    <label htmlFor="funcao">Função:</label>
                    <select name="funcao" id="funcao" {...register("funcao")}>
                        <option value="Administrador">Administrador</option>
                        <option value="Professor">Professor</option>
                    </select>
                    {errors.funcao && <p>{"Aviso"}: {errors.funcao.message}</p>}

                    <p className={css.possuiConta}>Já possui uma conta? Faça seu login <u onClick={() => navigate("/")}>aqui!</u></p>

                    <div className={css.botao}>
                        <button type="submit" onClick={() => navigate("/cadastro")}>Cadastrar</button>
                    </div>
                    {cadastro && <CadastroModal openModal={cadastro} closeModal={() => setCadastro(false)}/>}
                </form>
            </section>
        </main>
    )
}