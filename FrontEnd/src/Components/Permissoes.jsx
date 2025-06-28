import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PermissoesModal } from "./PermissoesModal";

export function Permissoes({ children }) {
     const funcao = localStorage.getItem("funcao");

     if(funcao !== "Administrador") {
          return <PermissoesModal openModal={true}/>;
     }

     return <>{children}</>
}