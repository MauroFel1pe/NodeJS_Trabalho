import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../services/equipe.service';
import { IEquipe } from '../entity/equipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  erro : string;
  equipes : IEquipe[];
  token : string = localStorage.getItem('usuario');

  constructor(private equipeService : EquipeService, 
              private router : Router) { }

  

  ngOnInit() {
    if (this.token) {
      this.equipeService.listar( this.token ).subscribe( data => { 
        if (data.error) {
          this.erro = data.error.message;
          this.equipes = [];
        } else if (data.equipes) {
          this.erro = "";
          this.equipes = data.equipes;
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  pathEscudo(e : IEquipe) {
    return "http://localhost:8080/" + e.escudo; 
  }

  editar(id : number) {
    this.router.navigate(['equipe/' + id]);
  }

  apagar(id : number) {
    this.equipeService.apagar(id, this.token).subscribe( data => {
      if (data.error) {
        this.erro = data.error.message;
      } else {
        this.router.navigate(['']);
      }
    });
  }

}
