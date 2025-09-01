import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { KeyboardComponent } from './components/tela/keyboard/keyboard.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { ListaTransacoesComponent } from './components/tela/lista-transacoes/lista-transacoes.component';
import { TelaComponent } from './components/tela/tela/tela.component';
import { TransacaoComponent } from './components/tela/transacao/transacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    KeyboardComponent,
    LoginFormComponent,
    ListaTransacoesComponent,
    TelaComponent,
    TransacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
