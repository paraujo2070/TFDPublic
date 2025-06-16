import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-viagem-extra',
  imports: [
    CommonModule,
    FormsModule],
  standalone: true,
  templateUrl: './cadastrar-viagem-extra.component.html',
  styleUrl: './cadastrar-viagem-extra.component.css'
})
export class CadastrarViagemExtraComponent {
  hospitais: string[] = [''];
  horarios: string[] = [''];

  constructor() { }

  cadastrarViagemExtra(formulario: NgForm): void {
    if (formulario.valid) {
      console.log('Formulário válido. Dados da viagem de ambulância:', formulario.value);
      alert('Viagem de ambulância cadastrada com sucesso! (Simulação)');
      formulario.resetForm();
      this.hospitais = [''];
      this.horarios = [''];
    } else {
      console.log('Formulário inválido.');
      alert('Por favor, preencha todos os campos obrigatórios.');
      Object.keys(formulario.controls).forEach(field => {
        const control = formulario.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  adicionarHospital(): void {
    this.hospitais.push('');
  }

  removerHospital(index: number): void {
    if (this.hospitais.length > 1) {
      this.hospitais.splice(index, 1);
    }
  }

  adicionarHorario(): void {
    this.horarios.push('');
  }

  removerHorario(index: number): void {
    if (this.horarios.length > 1) {
      this.horarios.splice(index, 1);
    }
  }
}
