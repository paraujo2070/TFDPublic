import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor, *ngIf, ngClass, titlecase pipe, etc.

// Interfaces para tipagem dos dados
interface DiaMes {
  numero: number;
  selecionado: boolean;
}

interface DeclaracaoTFD {
  id: string;
  mesPagamento: string; // Ex: "01", "02", ..., "12"
  nomePaciente: string;
  cpfPaciente: string;
  nomeAcompanhante?: string;
  valorPago: number; // Este campo é somente leitura no formulário de edição
  diasPagos: number[]; // Array com os números dos dias pagos, ex: [1, 2, 15]
  nomeArquivoAtual?: string;
  urlArquivoAtual?: string; // URL para visualizar o arquivo atual
  status: 'ativo' | 'inativo' | string; // Status da declaração
}

interface FiltrosDeclaracao {
  nomePaciente: string;
  mesPagamento: string;
  status: string;
}

@Component({
  selector: 'app-listar-editar-declaracao-tfd',
  standalone: true, // Assumindo que é um componente standalone
  imports: [CommonModule, FormsModule], // Importa CommonModule e FormsModule
  templateUrl: './listar-editar-declaracao-tfd.component.html',
  styleUrls: ['./listar-editar-declaracao-tfd.component.css'] // Corrigido para styleUrls
})
export class ListarEditarDeclaracaoTfdComponent implements OnInit {

  // Propriedades para os filtros
  filtros: FiltrosDeclaracao = {
    nomePaciente: '',
    mesPagamento: '',
    status: ''
  };

  // Lista de meses para os selects
  meses = [
    { valor: '01', nome: 'Janeiro' },
    { valor: '02', nome: 'Fevereiro' },
    { valor: '03', nome: 'Março' },
    { valor: '04', nome: 'Abril' },
    { valor: '05', nome: 'Maio' },
    { valor: '06', nome: 'Junho' },
    { valor: '07', nome: 'Julho' },
    { valor: '08', nome: 'Agosto' },
    { valor: '09', nome: 'Setembro' },
    { valor: '10', nome: 'Outubro' },
    { valor: '11', nome: 'Novembro' },
    { valor: '12', nome: 'Dezembro' }
  ];

  // Armazenamento das declarações
  todasAsDeclaracoes: DeclaracaoTFD[] = []; // Conteria todos os dados, idealmente de um serviço
  declaracoesFiltradas: DeclaracaoTFD[] = [];

  // Propriedades para o formulário de edição
  documentoEditavel: DeclaracaoTFD | null = null;
  diasDoMesEditavel: DiaMes[] = [];
  novoArquivoSelecionadoEdit: File | null = null;

  // Estados de carregamento e controle
  isLoading: boolean = false;
  isLoadingSalvar: boolean = false;
  filtroAplicado: boolean = false;

  // Referências aos formulários e input de arquivo no template
  @ViewChild('filtroForm') filtroForm!: NgForm;
  @ViewChild('editDocumentoForm') editDocumentoForm!: NgForm;
  @ViewChild('fileInputEdit') fileInputEdit!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    this.carregarDeclaracoesIniciais();
  }

  carregarDeclaracoesIniciais(): void {
    this.isLoading = true;
    // Simula uma chamada de API para carregar os dados
    setTimeout(() => {
      this.todasAsDeclaracoes = [
        { id: '1', nomePaciente: 'João da Silva Moreira', cpfPaciente: '111.111.111-11', mesPagamento: '03', valorPago: 150.00, diasPagos: [10, 11, 12], nomeArquivoAtual: 'declaracao_joao_mar23.pdf', urlArquivoAtual: '#mock-link-joao', status: 'ativo' },
        { id: '2', nomePaciente: 'Maria Oliveira Almeida', cpfPaciente: '222.222.222-22', mesPagamento: '03', valorPago: 200.50, diasPagos: [15, 16], nomeAcompanhante: 'Carlos Oliveira', nomeArquivoAtual: 'declaracao_maria_mar23.pdf', urlArquivoAtual: '#mock-link-maria', status: 'ativo' },
        { id: '3', nomePaciente: 'Pedro Santos Lima', cpfPaciente: '333.333.333-33', mesPagamento: '04', valorPago: 100.00, diasPagos: [5, 8, 9], nomeArquivoAtual: 'declaracao_pedro_abr23.pdf', urlArquivoAtual: '#mock-link-pedro', status: 'inativo' },
        { id: '4', nomePaciente: 'Ana Costa Pereira', cpfPaciente: '444.444.444-44', mesPagamento: '05', valorPago: 300.75, diasPagos: [1, 2, 3, 4, 5], nomeArquivoAtual: 'declaracao_ana_mai23.pdf', urlArquivoAtual: '#mock-link-ana', status: 'ativo' },
        { id: '5', nomePaciente: 'Lucas Ferreira Souza', cpfPaciente: '555.555.555-55', mesPagamento: '05', valorPago: 120.00, diasPagos: [20, 21], nomeAcompanhante: 'Juliana Ferreira', nomeArquivoAtual: 'declaracao_lucas_mai23.pdf', urlArquivoAtual: '#mock-link-lucas', status: 'ativo' },
      ];
      this.declaracoesFiltradas = [...this.todasAsDeclaracoes];
      this.isLoading = false;
    }, 1000); // Simula delay da rede
  }

  aplicarFiltros(): void {
    this.isLoading = true;
    this.filtroAplicado = true;
    this.documentoEditavel = null; // Garante que o form de edição não esteja visível

    // Simula a filtragem (em um app real, isso poderia ser uma chamada de API)
    setTimeout(() => {
      let resultado = [...this.todasAsDeclaracoes];

      if (this.filtros.nomePaciente) {
        resultado = resultado.filter(d =>
          d.nomePaciente.toLowerCase().includes(this.filtros.nomePaciente.toLowerCase())
        );
      }
      if (this.filtros.mesPagamento) {
        resultado = resultado.filter(d => d.mesPagamento === this.filtros.mesPagamento);
      }
      if (this.filtros.status) {
        resultado = resultado.filter(d => d.status === this.filtros.status);
      }
      this.declaracoesFiltradas = resultado;
      this.isLoading = false;
    }, 500);
  }

  listarTudo(): void {
    this.isLoading = true;
    this.filtroAplicado = false;
    this.documentoEditavel = null;
    this.filtros = { nomePaciente: '', mesPagamento: '', status: '' };
    if (this.filtroForm) {
      this.filtroForm.resetForm(this.filtros); // Reseta o formulário de filtro
    }
    setTimeout(() => {
      this.declaracoesFiltradas = [...this.todasAsDeclaracoes];
      this.isLoading = false;
    }, 500);
  }

  selecionarParaEdicao(declaracao: DeclaracaoTFD): void {
    // Cria uma cópia profunda do objeto para evitar modificar o original na lista diretamente
    this.documentoEditavel = JSON.parse(JSON.stringify(declaracao));
    this.novoArquivoSelecionadoEdit = null; // Limpa seleção de arquivo anterior
    if (this.fileInputEdit && this.fileInputEdit.nativeElement) {
      this.fileInputEdit.nativeElement.value = ''; // Reseta o input de arquivo
    }
    this.carregarDiasDoMesEditavel(); // Carrega os dias do mês para os checkboxes
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Rola para o formulário de edição
  }

  salvarAlteracoes(): void {
    // Validação extra no componente, embora o botão já esteja desabilitado
    if (!this.editDocumentoForm || !this.editDocumentoForm.valid || !this.documentoEditavel || this.getQuantidadeDiasSelecionadosEdit() === 0 || !this.novoArquivoSelecionadoEdit) {
      console.error("Formulário inválido ou campos obrigatórios não preenchidos para salvar.");
      // Marcar campos como "touched" para exibir mensagens de erro do HTML5, se necessário
      Object.values(this.editDocumentoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoadingSalvar = true;

    // Atualiza a lista de dias pagos no objeto 'documentoEditavel'
    this.documentoEditavel.diasPagos = this.diasDoMesEditavel
      .filter(dia => dia.selecionado)
      .map(dia => dia.numero);

    // Simula uma chamada de API para salvar
    console.log('Salvando alterações para:', this.documentoEditavel);
    console.log('Novo arquivo selecionado:', this.novoArquivoSelecionadoEdit.name);

    setTimeout(() => {
      const index = this.todasAsDeclaracoes.findIndex(d => d.id === this.documentoEditavel!.id);
      if (index !== -1 && this.documentoEditavel) {
        // Atualiza o nome do arquivo e URL (simulado)
        this.documentoEditavel.nomeArquivoAtual = this.novoArquivoSelecionadoEdit!.name;
        this.documentoEditavel.urlArquivoAtual = `#mock-url-para-${this.novoArquivoSelecionadoEdit!.name.replace(/\s/g, '_')}`;
        
        this.todasAsDeclaracoes[index] = { ...this.documentoEditavel }; // Atualiza na lista principal
      }

      this.isLoadingSalvar = false;
      this.documentoEditavel = null; // Fecha o formulário de edição
      this.novoArquivoSelecionadoEdit = null;
      if (this.fileInputEdit && this.fileInputEdit.nativeElement) {
        this.fileInputEdit.nativeElement.value = ''; // Limpa o input de arquivo
      }
      
      // Reaplica os filtros para atualizar a lista exibida ou simplesmente recarrega
      this.aplicarFiltros(); // Ou this.listarTudo() se preferir mostrar tudo após salvar

      console.log('Alterações salvas com sucesso!');
      // Em um app real, você usaria um serviço de Toast/Snackbar para feedback ao usuário
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo da página
    }, 1500);
  }

  cancelarEdicao(): void {
    this.documentoEditavel = null;
    this.novoArquivoSelecionadoEdit = null;
    if (this.fileInputEdit && this.fileInputEdit.nativeElement) {
      this.fileInputEdit.nativeElement.value = '';
    }
    this.diasDoMesEditavel = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFileSelectedEdit(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.novoArquivoSelecionadoEdit = input.files[0];
    } else {
      this.novoArquivoSelecionadoEdit = null;
    }
  }

  getQuantidadeDiasSelecionadosEdit(): number {
    if (!this.diasDoMesEditavel) return 0;
    return this.diasDoMesEditavel.filter(dia => dia.selecionado).length;
  }

  carregarDiasDoMesEditavel(): void {
    if (this.documentoEditavel && this.documentoEditavel.mesPagamento) {
      const mes = parseInt(this.documentoEditavel.mesPagamento, 10);
      // Assume o ano atual para simplicidade. Em um app real, o ano pode vir do dado.
      const ano = new Date().getFullYear();
      this.diasDoMesEditavel = this.gerarDiasParaMes(mes, ano);

      // Pré-seleciona os dias com base nos dados do 'documentoEditavel'
      if (this.documentoEditavel.diasPagos) {
        this.diasDoMesEditavel.forEach(dia => {
          if (this.documentoEditavel!.diasPagos.includes(dia.numero)) {
            dia.selecionado = true;
          }
        });
      }
    } else {
      this.diasDoMesEditavel = [];
    }
  }

  private gerarDiasParaMes(mes: number, ano: number): DiaMes[] {
    // O mês no construtor Date é 0-indexado (0 para Janeiro, 11 para Dezembro)
    // Então, se 'mes' é 1 (Janeiro), usamos mes-1.
    // Para pegar o último dia do mês, pedimos o dia 0 do mês seguinte.
    const diasNoMes = new Date(ano, mes, 0).getDate();
    const dias: DiaMes[] = [];
    for (let i = 1; i <= diasNoMes; i++) {
      dias.push({ numero: i, selecionado: false });
    }
    return dias;
  }

  getNomeMes(valorMes: string): string {
    const mesEncontrado = this.meses.find(m => m.valor === valorMes);
    return mesEncontrado ? mesEncontrado.nome : 'Desconhecido';
  }
}

