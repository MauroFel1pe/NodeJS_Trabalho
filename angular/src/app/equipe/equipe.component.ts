import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipeService } from '../services/equipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class CadastrarEquipeComponent implements OnInit {

  formGroup : FormGroup;
  mensagemErro : string;
  token : string = localStorage.getItem('usuario');

  formData = {
    id: 0,
    nome: "",
    sigla: "",
    pontos: 0,
    escudo: null,
    pathEscudo: null
  }

  constructor(private formBuilder : FormBuilder, 
              private router : Router,
              private equipeService : EquipeService,
              private activateRoute : ActivatedRoute) { }

  ngOnInit() {
    this.inicializar();

    let codigo = +this.activateRoute.snapshot.paramMap.get('id');
    if (codigo && codigo > 0) {
      this.equipeService.buscar(codigo, this.token).subscribe( data => {
        this.formData.id = data.equipe.id;
        this.formData.nome = data.equipe.nome;
        this.formData.sigla = data.equipe.sigla;
        this.formData.pontos = data.equipe.pontos;
        this.formData.escudo = data.equipe.escudo;
        this.carregarEquipe();
      });
    }
  }

  inicializar() {
    this.formGroup = this.formBuilder.group({
      id : [0],
      nome : ['', Validators.required],
      sigla : ['', Validators.required],
      pontos : [0, Validators.required],
      escudo : [null],
      pathEscudo : [null, Validators.required],
    });
  }

  carregarEquipe() {
    this.formGroup.setValue(this.formData); 
  }

  selecionarArquivo(evento) {
    this.formGroup.get('pathEscudo').setValue(evento.target.files[0]);
  }

  salvar() {
    if (this.formData.id != 0) {
      this.alterar();
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    this.equipeService.criar(this.formGroup.value, this.token).subscribe( data => {
      if (data.error) {
        this.mensagemErro = data.error.message;
      } else if (data.result.insertId && data.result.insertId > 0) {
        this.router.navigate(['/tabela']);
      } else {
        this.mensagemErro = "Não foi possível cadastrar a equipe";
      }
    });
    this.formGroup.updateValueAndValidity();
  }

  alterar() {
    this.equipeService.alterar(this.formGroup.value, this.token).subscribe( data => {
      if (data.error) {
        this.mensagemErro = data.error.message;
      } else if (data.result.changedRows && data.result.changedRows > 0) {
        this.router.navigate(['/tabela']);
      } else {
        this.mensagemErro = "Não foi possível cadastrar a equipe";
      }
    });
    this.formGroup.updateValueAndValidity();
  }
}
