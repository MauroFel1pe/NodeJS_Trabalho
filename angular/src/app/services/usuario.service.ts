import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IUsuario } from "../entity/usuario";
import { Observable, throwError } from "rxjs";
import { IResultado } from "../entity/resultado";
import { catchError } from 'rxjs/operators';

@Injectable( { providedIn: 'root'} )
export class UsuarioService {
    headers = new HttpHeaders(
            {
                'Content-Type':  'application/json'
            });

    constructor(private httpClient : HttpClient) { }

    login(usuario : IUsuario) {
        return this.httpClient.post<IResultado>('http://localhost:4200/api/login', JSON.stringify(usuario), {headers: this.headers} )
        .pipe(
            catchError(this.getError)
        );
    }

    criar(usuario : IUsuario) : Observable<IResultado> {
        return this.httpClient.post<IResultado>('http://localhost:4200/api/usuarios', JSON.stringify(usuario), {headers: this.headers})
        .pipe(
            catchError(this.getError)
        )
    }

    getError( erro : HttpErrorResponse) {
        return throwError(erro);
    }
}
