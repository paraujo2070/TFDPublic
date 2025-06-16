import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interface para Endereço da Viagem (se for diferente do endereço do paciente/acompanhante)
// Se o endereço no cadastro de viagem for o do paciente, podemos reutilizar a interface Endereco
// que definimos antes, mas precisaremos associá-la corretamente.
// Pelo formulário de cadastro, parece que o endereço é da VIAGEM ou do LOCAL DE DESTINO.
interface EnderecoViagem { // Renomeado para clareza, se for específico da viagem
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string; // No cadastro é 'estadoResidencia'
  cep: string;
  complemento?: string;
}

// Interface para Viagem atualizada para corresponder ao formulário de CADASTRO
interface Viagem {
  id: number;
  // Dados Gerais da Viagem
  nomePaciente: string;
  nomeAcompanhante?: string;
  dataViagem: string | Date;
  tipoViagem: 'TFD' | 'CONSULTA_EXAME' | string; // Adicionado tipoViagem aqui

  // Endereço (do local de destino da viagem ou residência para referência)
  // O formulário de cadastro tem uma seção "Endereço" que parece ser do local da viagem/consulta
  // ou um endereço de referência. Vamos chamá-lo de 'enderecoDestinoViagem' para clareza.
  enderecoDestinoViagem: EnderecoViagem; // Assumindo que é o endereço do destino

  // Contatos da Viagem
  telefone1: string;
  telefone2?: string;

  // Hospitais e Horários
  hospitais: string[];
  horarios: string[];

  // Observações (adicionado como um campo comum)
  observacoes?: string;

  // Campos que estavam na estrutura anterior e podem ou não ser relevantes agora
  // dependendo de como você quer que a edição funcione em relação ao cadastro de paciente.
  // Por ora, vou remover cpfPaciente, cpfAcompanhante, enderecoPaciente, dadosBancariosPaciente, enderecoAcompanhante
  // para focar nos campos EXATOS do formulário de cadastro de VIAGEM.
  // Se precisar deles, precisaremos entender como eles se relacionam com o formulário de cadastro de VIAGEM.
  // cpfPaciente?: string;
  // enderecoPaciente?: Endereco; // Se o endereço do cadastro de viagem for o do paciente
  // dadosBancariosPaciente?: DadosBancarios;
  // cpfAcompanhante?: string;
  // enderecoAcompanhante?: Endereco;
}


@Component({
  selector: 'app-listar-editar-viagem-tfd',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './listar-editar-viagem-tfd.component.html',
  styleUrls: ['./listar-editar-viagem-tfd.component.css']
})
export class ListarEditarViagemTfdComponent implements OnInit {

  tituloPagina: string = 'Gerenciar Viagens TFD';

  // Filtros
  filtroNomePaciente: string = '';
  filtroDataViagem: string = '';
  tipoViagemFiltro: 'TODOS' | 'TFD' | 'CONSULTA_EXAME' = 'TODOS';

  // Dados
  todasAsViagens: Viagem[] = [];
  viagensFiltradas: Viagem[] = [];

  // Estado de Edição
  viagemParaEdicao: Viagem | null = null;
  formularioEdicao: Viagem | null = null;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.carregarViagens();
  }

  carregarViagens(): void {
    // Simulação de carregamento de dados do backend
    // ATENÇÃO: Atualize esta estrutura para refletir os dados reais do seu backend
    // e os campos EXATOS do formulário de cadastro de VIAGEM.
    this.todasAsViagens = [
      {
        id: 1,
        nomePaciente: 'João Silva',
        nomeAcompanhante: 'Maria Silva',
        dataViagem: '2024-08-15',
        tipoViagem: 'TFD', // Este campo estava faltando na interface Viagem anterior
        enderecoDestinoViagem: { // Renomeado de 'endereco' para 'enderecoDestinoViagem'
          rua: 'Rua da Consulta',
          numero: '100',
          bairro: 'Centro Médico',
          cidade: 'São Paulo', // Cidade de destino da viagem
          estado: 'SP',     // Estado de destino da viagem
          cep: '01001-000',
          complemento: 'Sala 10'
        },
        telefone1: '(11) 99999-1111',
        telefone2: '(11) 88888-1111',
        hospitais: ['Hospital Central', 'Clínica Esperança'],
        horarios: ['09:00', '14:30'],
        observacoes: 'Levar todos os exames anteriores.'
      },
      {
        id: 2,
        nomePaciente: 'Ana Costa',
        dataViagem: '2024-09-01',
        tipoViagem: 'CONSULTA_EXAME',
        enderecoDestinoViagem: {
          rua: 'Av. Saúde',
          numero: '250',
          bairro: 'Bairro Feliz',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '02002-000',
        },
        telefone1: '(21) 98888-2222',
        hospitais: ['Instituto de Olhos'],
        horarios: ['11:00'],
      },
    ];
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    this.viagensFiltradas = this.todasAsViagens.filter(viagem => {
      const correspondeNome = this.filtroNomePaciente ?
        (viagem.nomePaciente.toLowerCase().includes(this.filtroNomePaciente.toLowerCase()) ||
          (viagem.nomeAcompanhante && viagem.nomeAcompanhante.toLowerCase().includes(this.filtroNomePaciente.toLowerCase())))
        : true;

      const dataViagemFormatada = this.datePipe.transform(viagem.dataViagem, 'yyyy-MM-dd');
      const correspondeData = this.filtroDataViagem ?
        dataViagemFormatada === this.filtroDataViagem
        : true;

      // Ajuste para o filtro de tipo de viagem, já que tipoViagem está na raiz do objeto Viagem
      const correspondeTipo = this.tipoViagemFiltro !== 'TODOS' ?
        viagem.tipoViagem === this.tipoViagemFiltro
        : true;

      return correspondeNome && correspondeData && correspondeTipo;
    });
  }

  limparFiltros(): void {
    this.filtroNomePaciente = '';
    this.filtroDataViagem = '';
    this.tipoViagemFiltro = 'TODOS';
    this.aplicarFiltro();
  }

  selecionarParaEdicao(viagem: Viagem): void {
    this.viagemParaEdicao = viagem;
    this.formularioEdicao = JSON.parse(JSON.stringify(viagem));

    if (this.formularioEdicao) {
      this.formularioEdicao.dataViagem = this.datePipe.transform(viagem.dataViagem, 'yyyy-MM-dd') || '';
      // Garante que as subestruturas existam se forem opcionais e não vierem na viagem original
      if (!this.formularioEdicao.enderecoDestinoViagem) {
        this.formularioEdicao.enderecoDestinoViagem = { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' };
      }
      if (!this.formularioEdicao.hospitais) {
        this.formularioEdicao.hospitais = ['']; // Inicializa com um campo se não existir
      }
      if (!this.formularioEdicao.horarios) {
        this.formularioEdicao.horarios = ['']; // Inicializa com um campo se não existir
      }
    }
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
  }

  cancelarEdicaoViagem(): void {
    this.viagemParaEdicao = null;
    this.formularioEdicao = null;
  }

  salvarEdicaoViagem(): void {
    if (!this.formularioEdicao || !this.viagemParaEdicao) {
      console.error('Formulário de edição ou viagem original não encontrados.');
      return;
    }
    this.isLoading = true;
    console.log('Salvando alterações para a viagem:', this.formularioEdicao);

    setTimeout(() => {
      const index = this.todasAsViagens.findIndex(v => v.id === this.viagemParaEdicao!.id);
      if (index !== -1) {
        this.todasAsViagens[index] = JSON.parse(JSON.stringify(this.formularioEdicao));
      }
      this.aplicarFiltro();
      this.isLoading = false;
      this.viagemParaEdicao = null;
      this.formularioEdicao = null;
      alert('Alterações salvas com sucesso! (Simulação)');
      window.scrollTo(0, 0);
    }, 1500);
  }

  excluirViagem(viagem: Viagem): void {
    if (confirm(`Tem certeza que deseja excluir a viagem do paciente ${viagem.nomePaciente}?`)) {
      this.todasAsViagens = this.todasAsViagens.filter(v => v.id !== viagem.id);
      this.aplicarFiltro();
      alert('Viagem excluída (simulação).');
    }
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/tfd/cadastrar-viagem']); // Ajuste a rota conforme necessário
  }

  // Funções para gerenciar hospitais e horários dinamicamente no formulário de edição
  adicionarHospitalEdicao(): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais) {
      this.formularioEdicao.hospitais.push('');
    }
  }

  removerHospitalEdicao(index: number): void {
    if (this.formularioEdicao && this.formularioEdicao.hospitais && this.formularioEdicao.hospitais.length > 1) {
      this.formularioEdicao.hospitais.splice(index, 1);
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
    }
  }

  // Necessário para que o ngFor com ngModel em inputs funcione corretamente
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
