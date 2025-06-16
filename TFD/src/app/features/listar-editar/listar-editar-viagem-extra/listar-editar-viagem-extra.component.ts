import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// É uma boa prática definir interfaces para a estrutura dos seus dados
interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento?: string;
}

interface ViagemExtra { // Renomeado de ViagemAmbulancia para ViagemExtra
  id: number; // Identificador único para cada viagem
  nomePaciente: string;
  nomeAcompanhante?: string;
  dataViagem: string; // Usar string no formato YYYY-MM-DD para compatibilidade com input date
  enderecoOrigem: Endereco;
  telefone1: string;
  telefone2?: string;
  hospitais: string[];
  horarios: string[];
}

@Component({
  selector: 'app-listar-editar-viagem-extra', // Alterado o seletor
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './listar-editar-viagem-extra.component.html', // Alterado o template URL
  styleUrls: ['./listar-editar-viagem-extra.component.css'] // Alterado o style URL
})
export class ListarEditarViagemExtraComponent implements OnInit { // Alterado o nome da classe
  viagens: ViagemExtra[] = [];
  viagensFiltradas: ViagemExtra[] = [];

  filtroNomePaciente: string = '';
  filtroDataViagem: string = ''; // Formato YYYY-MM-DD

  viagemParaEdicao: ViagemExtra | null = null;
  formularioEdicao: any = {};
  isLoading: boolean = false;

  // Mock de dados iniciais para ViagemExtra.
  private mockViagens: ViagemExtra[] = [
    {
      id: 101,
      nomePaciente: 'Fernanda Vagner',
      nomeAcompanhante: 'Rodrigo Alberto',
      dataViagem: '2024-08-10',
      enderecoOrigem: { rua: 'Rua das Palmeiras', numero: '77', bairro: 'Leblon', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '22440-000', complemento: 'Cobertura' },
      telefone1: '21988776655',
      hospitais: ['Clínica São Vicente'],
      horarios: ['11:00']
    },
    {
      id: 102,
      nomePaciente: 'Marcos José',
      dataViagem: '2024-08-12',
      enderecoOrigem: { rua: 'Av. Paulista', numero: '1500', bairro: 'Bela Vista', cidade: 'São Paulo', estado: 'SP', cep: '01310-200' },
      telefone1: '11977665544',
      hospitais: ['Hospital Nove de Julho', 'Consultório Dr. Estranho'],
      horarios: ['16:30', '17:00']
    }
  ];

  constructor(private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.carregarViagens();
  }

  carregarViagens(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.viagens = [...this.mockViagens];
      this.aplicarFiltro();
      this.isLoading = false;
    }, 500);
  }

  aplicarFiltro(): void {
    let resultado = [...this.viagens];

    if (this.filtroNomePaciente) {
      resultado = resultado.filter(viagem =>
        viagem.nomePaciente.toLowerCase().includes(this.filtroNomePaciente.toLowerCase())
      );
    }

    if (this.filtroDataViagem) {
      resultado = resultado.filter(viagem =>
        viagem.dataViagem === this.filtroDataViagem
      );
    }
    this.viagensFiltradas = resultado;
  }

  limparFiltros(): void {
    this.filtroNomePaciente = '';
    this.filtroDataViagem = '';
    this.aplicarFiltro();
  }

  selecionarParaEdicao(viagem: ViagemExtra): void {
    this.viagemParaEdicao = viagem;
    this.formularioEdicao = JSON.parse(JSON.stringify(viagem));
  }

  salvarEdicaoViagem(): void {
    if (!this.formularioEdicao || !this.viagemParaEdicao) return;

    this.isLoading = true;
    setTimeout(() => {
      const index = this.viagens.findIndex(v => v.id === this.formularioEdicao.id);
      if (index !== -1) {
        this.viagens[index] = { ...this.formularioEdicao };
        const mockIndex = this.mockViagens.findIndex(v => v.id === this.formularioEdicao.id);
        if (mockIndex !== -1) {
            this.mockViagens[mockIndex] = { ...this.formularioEdicao };
        }
      }
      this.aplicarFiltro();
      this.cancelarEdicaoViagem();
      this.isLoading = false;
      alert('Viagem Extra atualizada com sucesso! (Simulação)'); // Mensagem alterada
    }, 1000);
  }

  cancelarEdicaoViagem(): void {
    this.viagemParaEdicao = null;
    this.formularioEdicao = {};
  }

  excluirViagem(idViagem: number): void {
    if (confirm('Tem certeza que deseja excluir esta Viagem Extra?')) { // Mensagem alterada
      this.isLoading = true;
      setTimeout(() => {
        this.viagens = this.viagens.filter(v => v.id !== idViagem);
        this.mockViagens = this.mockViagens.filter(v => v.id !== idViagem);
        this.aplicarFiltro();
        this.isLoading = false;
        alert('Viagem Extra excluída com sucesso! (Simulação)'); // Mensagem alterada
      }, 1000);
    }
  }

  navegarParaCadastro(): void {
    this.router.navigate(['tfd/cadastrar-viagem-extra']); // Rota ajustada para o cadastro de viagem extra
  }

  adicionarHospitalEdicao(): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais) {
      this.formularioEdicao.hospitais.push('');
    }
  }

  removerHospitalEdicao(index: number): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais && this.formularioEdicao.hospitais.length > 1) {
      this.formularioEdicao.hospitais.splice(index, 1);
    } else if (this.formularioEdicao && this.formularioEdicao.hospitais && this.formularioEdicao.hospitais.length === 1) {
      alert('É necessário pelo menos um hospital de destino.');
    }
  }

  adicionarHorarioEdicao(): void {
    if (this.formularioEdicao && this.formularioEdicao.horarios) {
      this.formularioEdicao.horarios.push('');
    }
  }

  removerHorarioEdicao(index: number): void {
    if (this.formularioEdicao && this.formularioEdicao.horarios && this.formularioEdicao.horarios.length > 1) {
      this.formularioEdicao.horarios.splice(index, 1);
    } else if (this.formularioEdicao && this.formularioEdicao.horarios && this.formularioEdicao.horarios.length === 1) {
      alert('É necessário pelo menos um horário.');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}