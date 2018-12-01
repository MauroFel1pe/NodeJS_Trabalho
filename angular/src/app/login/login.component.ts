import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario : FormGroup;
  erro: string;

  constructor(private formBuilder : FormBuilder, 
              private usuarioServico : UsuarioService,
              private router : Router) { }

  ngOnInit() { 
    this.configurar();
    if (localStorage.getItem('usuario')) {
      this.redirecionar();
    }
  }

  configurar() {
    this.formulario = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  logar() {
    this.usuarioServico.login(this.formulario.value).subscribe(data => {
      if (data.error) {
        if (data.error.message) {
          this.erro = data.error.message;
        } else {
          this.erro = "Ocorreu um erro na comunicação."; 
        }
      } else {
        this.erro = "";
        localStorage.setItem('usuario', data.result.token);
        this.redirecionar();
      } });
      this.formulario.updateValueAndValidity();
  };

  redirecionar() {
    this.router.navigate(['/','tabela']);
  }

}
