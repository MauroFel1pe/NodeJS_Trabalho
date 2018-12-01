import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TabelaComponent } from './tabela/tabela.component';
import { UsuarioService } from './services/usuario.service';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { EquipeService } from './services/equipe.service';
import { LogoutComponent } from './logout/logout.component';
import { CadastrarEquipeComponent } from './equipe/equipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabelaComponent,
    CadastrarUsuarioComponent,
    LogoutComponent,
    CadastrarEquipeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: '', component: LoginComponent},
        {path: 'logout', component: LogoutComponent},
        {path: 'tabela', component: TabelaComponent},
        {path: 'cadastro', component: CadastrarUsuarioComponent},
        {path: 'equipe', component: CadastrarEquipeComponent},
        {path: 'equipe/:id', component: CadastrarEquipeComponent}
      ]
    )
  ],
  providers: [
    UsuarioService,
    EquipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
