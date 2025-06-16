import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-paciente-tfd',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './cadastrar-paciente-tfd.component.html',
  styleUrl: './cadastrar-paciente-tfd.component.css'
})
export class CadastrarPacienteTFDComponent {
  @ViewChild('pacienteForm') pacienteForm!: NgForm;

  paciente = {
    nome: '',
    cpf: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    dadosBancarios: {
      nomeBanco: '',
      agencia: '',
      conta: '',
      digitoConta: '',
      tipoConta: '',
      nomeTitular: '',
      cpfTitular: '',
      cpfPix: false
    },
    ativo: true
  };

  acompanhante = {
    nome: '',
    cpf: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  };

  arquivosSelecionados: File[] = [];

  constructor() { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivosSelecionados = Array.from(input.files);
      console.log(this.arquivosSelecionados);
    }
  }

  cadastrarPaciente(): void {
    if (this.pacienteForm.valid) {
      console.log('Dados do Paciente:', this.paciente);
      console.log('Dados do Acompanhante:', this.acompanhante);
      console.log('Arquivos Comprovantes:', this.arquivosSelecionados);


      alert('Paciente cadastrado com sucesso! (Verifique o console para os dados)');
    } else {
      console.error('Formulário inválido. Por favor, verifique os campos.');
      Object.keys(this.pacienteForm.controls).forEach(field => {
        const control = this.pacienteForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
