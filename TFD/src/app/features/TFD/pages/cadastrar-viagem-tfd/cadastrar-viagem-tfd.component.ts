import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-viagem-tfd',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cadastrar-viagem-tfd.component.html',
  styleUrl: './cadastrar-viagem-tfd.component.css'
})
export class CadastrarViagemTFDComponent {
  @ViewChild('formularioViagem') formularioViagem!: NgForm;

 
  hospitais: string[] = ['']; 
  horarios: string[] = [''];  

  tipoViagemSelecionado: string = 'TFD'; 
  tituloPagina: string = 'Cadastrar Nova Viagem TFD';

  constructor(
   
  ) {}

  ngOnInit(): void {
    this.atualizarContextoViagem(); 
  }

  atualizarContextoViagem(): void {
    if (this.tipoViagemSelecionado === 'TFD') {
      this.tituloPagina = 'Cadastrar Nova Viagem TFD';
      
    } else if (this.tipoViagemSelecionado === 'CONSULTA_EXAME') {
      this.tituloPagina = 'Cadastrar Viagem para Consultas/Exames';
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

  cadastrarViagem(): void {
    if (this.formularioViagem.valid) {
      const dadosDoFormulario = { ...this.formularioViagem.value };
      
      dadosDoFormulario.hospitais = this.hospitais.filter(h => h && h.trim() !== '');
      dadosDoFormulario.horarios = this.horarios.filter(h => h && h.trim() !== '');
      
     
      dadosDoFormulario.tipoViagem = this.tipoViagemSelecionado;

      console.log('Dados da Viagem a serem cadastrados:', dadosDoFormulario);

      if (this.tipoViagemSelecionado === 'TFD') {
        console.log('Enviando para o endpoint de TFD...');
       
      } else if (this.tipoViagemSelecionado === 'CONSULTA_EXAME') {
        console.log('Enviando para o endpoint de Consultas/Exames...');
      }
      
      
    } else {
      console.error('Formulário inválido. Por favor, verifique os campos.');
      Object.keys(this.formularioViagem.controls).forEach(field => {
        const control = this.formularioViagem.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
