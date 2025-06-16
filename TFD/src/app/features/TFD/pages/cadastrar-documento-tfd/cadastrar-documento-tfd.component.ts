import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DiaDoMes {
  numero: number;
  selecionado: boolean;
}

@Component({
  selector: 'app-cadastrar-documento-tfd',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrar-documento-tfd.component.html',
  styleUrl: './cadastrar-documento-tfd.component.css'
})
export class CadastrarDocumentoTFDComponent implements OnInit {
  @ViewChild('documentoForm') documentoForm!: NgForm;

  documento = {
    mesPagamento: '',
    valorPago: null as number | null,
    nomePaciente: '',
    cpfPaciente: '',
    nomeAcompanhante: '',
  };

  meses = [
    { nome: 'Janeiro', valor: '01' }, { nome: 'Fevereiro', valor: '02' },
    { nome: 'Março', valor: '03' }, { nome: 'Abril', valor: '04' },
    { nome: 'Maio', valor: '05' }, { nome: 'Junho', valor: '06' },
    { nome: 'Julho', valor: '07' }, { nome: 'Agosto', valor: '08' },
    { nome: 'Setembro', valor: '09' }, { nome: 'Outubro', valor: '10' },
    { nome: 'Novembro', valor: '11' }, { nome: 'Dezembro', valor: '12' }
  ];

  diasDoMes: DiaDoMes[] = [];
  arquivoSelecionado: File | null = null;

  constructor() { }

  ngOnInit(): void {
    this.inicializarDiasDoMes();
  }

  inicializarDiasDoMes(): void {
    this.diasDoMes = [];
    for (let i = 1; i <= 31; i++) {
      this.diasDoMes.push({ numero: i, selecionado: false });
    }
  }

  getQuantidadeDiasSelecionados(): number {
    return this.diasDoMes.filter(dia => dia.selecionado).length;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];
      console.log('Arquivo selecionado:', this.arquivoSelecionado);
    } else {
      this.arquivoSelecionado = null;
    }
  }

  cadastrarDocumento(): void {
    if (this.documentoForm.valid && this.arquivoSelecionado && this.getQuantidadeDiasSelecionados() > 0) {
      const diasPagos = this.diasDoMes.filter(dia => dia.selecionado).map(dia => dia.numero);

      const dadosParaEnvio = {
        ...this.documento,
        diasPagos: diasPagos,
        quantidadeDiasPagos: diasPagos.length
      };

      console.log('Dados do Documento:', dadosParaEnvio);
      console.log('Arquivo Declaração:', this.arquivoSelecionado);

      alert('Documento cadastrado com sucesso! (Verifique o console para os dados)');

    } else {
      console.error('Formulário inválido ou informações pendentes.');
      if (!this.arquivoSelecionado) {
        console.error('Nenhum arquivo de declaração selecionado.');
      }
      if (this.getQuantidadeDiasSelecionados() === 0) {
        console.error('Nenhum dia selecionado para pagamento.');
      }
      Object.keys(this.documentoForm.controls).forEach(field => {
        const control = this.documentoForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
