import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IResultado } from '../entity/resultado';
import { catchError } from 'rxjs/operators';
import { IEquipe } from '../entity/equipe';

@Injectable()
export class EquipeService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': ''
    });

    constructor(private httpClient : HttpClient) { }

    listar(token : string) : Observable<IResultado> {
        this.headers = this.headers.set('x-access-token', token);
        return this.httpClient.get<IResultado>('http://localhost:4200/api/equipes', { headers : this.headers})
                .pipe(
                    catchError(this.getError)
                );
    }

    criar(equipe, token : string) : Observable<IResultado> {
        this.headers = this.headers.set('x-access-token', token);
        /*
        this.headers = this.headers.set('Content-Type', 'multipart/form-data');
        não enviar o content-type. Adiciona-lo gerar um erro 
        */
        this.headers = this.headers.delete('Content-Type', 'application/json');

        const fd = new FormData();
        fd.append('nome', equipe.nome);
        fd.append('sigla', equipe.sigla);
        if (equipe.pontos) {
            fd.append('pontos', equipe.pontos.toString());
        }
        if (equipe.pathEscudo) {
            fd.append('pathEscudo', equipe.pathEscudo, equipe.pathEscudo.name);
        }

        return this.httpClient.post<IResultado>('http://localhost:4200/api/equipes', fd, {headers: this.headers})
            .pipe(
                catchError(this.getError)
            );
    }

    buscar(id : number, token : string) : Observable<IResultado> {
        this.headers = this.headers.set('x-access-token', token);
        return this.httpClient.get<IResultado>('http://localhost:4200/api/equipes/' + `${ id }`, {headers : this.headers})
            .pipe(
                catchError(this.getError)
            );
    }

    alterar(equipe, token : string) : Observable<IResultado> {
        this.headers = this.headers.set('x-access-token', token);
        /*
        this.headers = this.headers.set('Content-Type', 'multipart/form-data');
        não enviar o content-type. Adiciona-lo gerar um erro 
        */
        this.headers = this.headers.delete('Content-Type', 'application/json');

        const fd = new FormData();
        fd.append('nome', equipe.nome);
        fd.append('sigla', equipe.sigla);
        if (equipe.pontos) {
            fd.append('pontos', equipe.pontos.toString());
        }
        if (equipe.pathEscudo) {
            fd.append('pathEscudo', equipe.pathEscudo, equipe.pathEscudo.name);
        } else if (equipe.escudo) {
            fd.append('escudo', equipe.escudo);
        }

        return this.httpClient.put<IResultado>('http://localhost:4200/api/equipes/' + `${ equipe.id }`, fd, { headers: this.headers })
            .pipe(
                catchError(this.getError)
            );
    }

    apagar(id : number, token : string) : Observable<IResultado> {
        this.headers = this.headers.set('x-access-token', token);
        return this.httpClient.delete<IResultado>('http://localhost:4200/api/equipes/' + `${ id }`, {headers: this.headers})
            .pipe(
                catchError(this.getError)
            );
    }

    getError( erro : HttpErrorResponse ) {
        return throwError(erro);
    }
}