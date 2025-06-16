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

interface ViagemAmbulancia {
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
  selector: 'app-listar-editar-viagem-ambulancia',
  standalone: true,
  imports: [
    CommonModule, // Para diretivas como *ngFor, *ngIf, DatePipe
    FormsModule,  // Para [(ngModel)] e #formEdicaoViagem="ngForm"
    // DatePipe já está incluído no CommonModule em versões mais recentes do Angular,
    // mas pode ser importado separadamente se necessário ou para clareza.
  ],
  providers: [DatePipe], // Necessário se DatePipe não for automaticamente provido pelo CommonModule
  templateUrl: './listar-editar-viagem-ambulancia.component.html',
  styleUrls: ['./listar-editar-viagem-ambulancia.component.css'] // Corrigido para styleUrls
})
export class ListarEditarViagemAmbulanciaComponent implements OnInit {
  viagens: ViagemAmbulancia[] = [];
  viagensFiltradas: ViagemAmbulancia[] = [];

  filtroNomePaciente: string = '';
  filtroDataViagem: string = ''; // Formato YYYY-MM-DD

  viagemParaEdicao: ViagemAmbulancia | null = null;
  // Usar 'any' para formularioEdicao pode ser flexível, mas ViagemAmbulancia (ou um DTO específico para edição) seria mais seguro em tipo
  formularioEdicao: any = {};
  isLoading: boolean = false; // Para feedback visual durante operações assíncronas

  // Mock de dados iniciais. Substitua isso por uma chamada de serviço real.
  private mockViagens: ViagemAmbulancia[] = [
    {
      id: 1,
      nomePaciente: 'Carlos José',
      nomeAcompanhante: 'Andréa Maria',
      dataViagem: '2024-07-28',
      enderecoOrigem: { rua: 'Rua dos Bobos', numero: '0', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', cep: '01000-000', complemento: 'Apto 101' },
      telefone1: '11987654321',
      hospitais: ['Hospital Sírio Libanês'],
      horarios: ['14:00']
    },
    {
      id: 2,
      nomePaciente: 'Ana Maria Martins',
      dataViagem: '2024-07-29',
      enderecoOrigem: { rua: 'Av. Brasil', numero: '1000', bairro: 'Jardins', cidade: 'São Paulo', estado: 'SP', cep: '01450-000' },
      telefone1: '11912345678',
      telefone2: '11987651234',
      hospitais: ['Hospital Albert Einstein', 'Clínica Mais Saúde'],
      horarios: ['09:30', '15:00']
    },
    {
      id: 3,
      nomePaciente: 'Roberto Aurélio',
      nomeAcompanhante: 'Ana Paula',
      dataViagem: '2024-08-01',
      enderecoOrigem: { rua: 'Rua Europa', numero: '250', bairro: 'Jardim Europa', cidade: 'São Paulo', estado: 'SP', cep: '01449-000' },
      telefone1: '11999990000',
      hospitais: ['Hospital do Coração (HCor)'],
      horarios: ['10:15']
    }
  ];

  constructor(private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.carregarViagens();
  }

  carregarViagens(): void {
    // Simulação de carregamento de dados. Em um app real, viria de um serviço.
    this.isLoading = true;
    setTimeout(() => { // Simula uma chamada assíncrona
      this.viagens = [...this.mockViagens]; // Cria uma cópia para evitar modificar o mock original diretamente
      this.aplicarFiltro(); // Aplica filtros iniciais (se houver) ou mostra todos
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

    if (this.filtroDataViagem) { // filtroDataViagem está no formato YYYY-MM-DD
      resultado = resultado.filter(viagem =>
        viagem.dataViagem === this.filtroDataViagem
      );
    }
    this.viagensFiltradas = resultado;
  }

  limparFiltros(): void {
    this.filtroNomePaciente = '';
    this.filtroDataViagem = '';
    this.aplicarFiltro(); // Re-aplica para mostrar todos os dados
  }

  selecionarParaEdicao(viagem: ViagemAmbulancia): void {
    this.viagemParaEdicao = viagem;
    // Cria uma cópia profunda para edição, para não alterar o objeto original na lista antes de salvar
    this.formularioEdicao = JSON.parse(JSON.stringify(viagem));
    // O input date espera o formato YYYY-MM-DD, que já é o formato da nossa string dataViagem.
  }

  salvarEdicaoViagem(): void {
    if (!this.formularioEdicao || !this.viagemParaEdicao) return;

    this.isLoading = true;
    // Simulação de chamada ao backend
    setTimeout(() => {
      const index = this.viagens.findIndex(v => v.id === this.formularioEdicao.id);
      if (index !== -1) {
        this.viagens[index] = { ...this.formularioEdicao }; // Atualiza na lista principal
        // Atualiza também no mock para persistência da simulação entre recargas da lista
        const mockIndex = this.mockViagens.findIndex(v => v.id === this.formularioEdicao.id);
        if (mockIndex !== -1) {
            this.mockViagens[mockIndex] = { ...this.formularioEdicao };
        }
      }
      this.aplicarFiltro(); // Re-aplica filtros para atualizar a exibição
      this.cancelarEdicaoViagem();
      this.isLoading = false;
      alert('Viagem atualizada com sucesso! (Simulação)');
    }, 1000);
  }

  cancelarEdicaoViagem(): void {
    this.viagemParaEdicao = null;
    this.formularioEdicao = {};
  }

  excluirViagem(idViagem: number): void {
    if (confirm('Tem certeza que deseja excluir esta viagem de ambulância?')) {
      this.isLoading = true;
      // Simulação de chamada ao backend
      setTimeout(() => {
        this.viagens = this.viagens.filter(v => v.id !== idViagem);
        this.mockViagens = this.mockViagens.filter(v => v.id !== idViagem); // Remove do mock também
        this.aplicarFiltro();
        this.isLoading = false;
        alert('Viagem excluída com sucesso! (Simulação)');
      }, 1000);
    }
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/tfd/cadastrar-viagem-ambulancia']); // Ajuste a rota conforme sua configuração
  }

  // Métodos para manipular hospitais e horários no formulário de edição
  adicionarHospitalEdicao(): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais) {
      this.formularioEdicao.hospitais.push('');
    }
  }

  removerHospitalEdicao(index: number): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais && this.formularioEdicao.hospitais.length > 1) {
      this.formularioEdicao.hospitais.splice(index, 1);
    } else if (this.formularioEdicao && this.formularioEdicao.hospitais && this.formularioEdicao.hospitais.length === 1) {
      // Opcional: Limpar o último campo em vez de remover, ou alertar que pelo menos um é necessário se for o caso.
      // this.formularioEdicao.hospitais[0] = '';
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
      // Opcional: Limpar o último campo em vez de remover.
      // this.formularioEdicao.horarios[0] = '';
      alert('É necessário pelo menos um horário.');
    }
  }

  // Necessário para o *ngFor com trackBy ao editar arrays de strings/objetos
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}