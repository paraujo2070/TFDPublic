import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  nomeCompleto: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  cargo: string = '';

  constructor() { }

  cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      console.error("As senhas não coincidem!");
      alert("As senhas não coincidem!");
      return;
    }
    console.log('Usuário cadastrado:', this.nomeCompleto, this.email, this.cargo);
  }
}
