import { IUsuario } from "./usuario";
import { IEquipe } from "./equipe";

export interface IResultado {
    error : IErro;
    usuarios : IUsuario[];
    result : any;
    equipes : IEquipe[];
    equipe : IEquipe;
}

export interface IErro {
    code : string;
    message : string;
}