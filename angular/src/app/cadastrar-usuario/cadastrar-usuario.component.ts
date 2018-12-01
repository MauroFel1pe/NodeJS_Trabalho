import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { IUsuario } from '../entity/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  formulario : FormGroup;
  erro: string;
  mensagemOk: string;

  constructor(private formBuilder : FormBuilder, private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  cadastrar() {
    this.usuarioService.criar(this.formulario.value).subscribe( data => {
      if (data.error) {
        this.erro = data.error.message;
        this.mensagemOk = "";
      } else if (data.result.insertId && data.result.insertId > 0) {
        this.mensagemOk = "Usuário cadastrado!";
        this.erro = "";
      } else {
        this.mensagemOk = "";
        this.erro = "Não foi possível cadastrar o usuário"
      }
    });
    this.formulario.updateValueAndValidity();
  }

}
