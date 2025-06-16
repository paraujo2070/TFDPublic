import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-motorista',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './cadastrar-motorista.component.html',
  styleUrl: './cadastrar-motorista.component.css'
})
export class CadastrarMotoristaComponent {

  nomeCompleto: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  nomeMae: string = '';
  telefone: string = '';
  numeroCnh: string = '';
  validadeCnh: string = '';
  tipoA: boolean = false;
  tipoB: boolean = false;
  tipoC: boolean = false;
  tipoD: boolean = false;
  tipoE: boolean = false;
  ear: string = '';
  placaVeiculo: string = '';

  constructor() { }

  
  handleCategoriaPrincipalChange(categoriaAlterada: 'B' | 'C' | 'D' | 'E') {
    if (categoriaAlterada === 'B' && this.tipoB) {
      this.tipoC = false; this.tipoD = false; this.tipoE = false;
    } else if (categoriaAlterada === 'C' && this.tipoC) {
      this.tipoB = false; this.tipoD = false; this.tipoE = false;
    } else if (categoriaAlterada === 'D' && this.tipoD) {
      this.tipoB = false; this.tipoC = false; this.tipoE = false;
    } else if (categoriaAlterada === 'E' && this.tipoE) {
      this.tipoB = false; this.tipoC = false; this.tipoD = false;
    }
  }

  cadastrarMotorista(){
    const categoriasPrincipais = [this.tipoB, this.tipoC, this.tipoD, this.tipoE];
    const countCategoriasPrincipaisMarcadas = categoriasPrincipais.filter(cat => cat).length;

    if (countCategoriasPrincipaisMarcadas > 1) {
      alert('Erro: Selecione apenas uma categoria principal de habilitação (B, C, D ou E).');
      return;
    }

    if (!this.tipoA && countCategoriasPrincipaisMarcadas === 0) {
      alert('Erro: Selecione ao menos um tipo de habilitação.');
      return;
    }

    
    console.log('Dados do Motorista:', {
      nomeCompleto: this.nomeCompleto, cpf: this.cpf, dataNascimento: this.dataNascimento,
      nomeMae: this.nomeMae, telefone: this.telefone, numeroCnh: this.numeroCnh,
      validadeCnh: this.validadeCnh, tipoA: this.tipoA, tipoB: this.tipoB,
      tipoC: this.tipoC, tipoD: this.tipoD, tipoE: this.tipoE, ear: this.ear,
      placaVeiculo: this.placaVeiculo
    });
    alert('Motorista cadastrado com sucesso! (Verifique o console para os dados)');
  }
}
