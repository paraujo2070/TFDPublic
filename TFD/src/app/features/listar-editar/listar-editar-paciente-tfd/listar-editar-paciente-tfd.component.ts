import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface DadosBancarios {
  nomeBanco: string;
  agencia: string;
  conta: string;
  digitoConta?: string;
  tipoConta: string; // Ex: 'CORRENTE', 'POUPANCA'
  nomeTitular: string;
  cpfTitular: string;
  cpfPix: boolean;
}

interface Acompanhante {
  nome: string;
  cpf: string;
  endereco: Endereco;
}

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  endereco: Endereco;
  dadosBancarios: DadosBancarios;
  ativo: boolean;
  acompanhante?: Acompanhante; // Acompanhante é opcional
}

@Component({
  selector: 'app-listar-editar-paciente-tfd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-editar-paciente-tfd.component.html',
  styleUrls: ['./listar-editar-paciente-tfd.component.css']
})
export class ListarEditarPacienteTfdComponent implements OnInit {
  tituloPagina: string = 'Gerenciar Pacientes TFD';
  todosOsPacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];

  // Propriedades para os filtros
  filtroNome: string = '';
  filtroStatus: 'TODOS' | 'ATIVOS' | 'INATIVOS' = 'TODOS';

  pacienteParaEdicao: Paciente | null = null;
  formularioEdicao: Paciente | null = null;
  isLoading: boolean = false;

  // Estrutura para um novo acompanhante, caso seja adicionado na edição
  novoAcompanhanteTemplate: Acompanhante = {
    nome: '',
    cpf: '',
    endereco: { cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' }
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    // Simulação de carregamento de dados
    this.todosOsPacientes = [
      {
        id: 1,
        nome: 'Paulo Sebastião Araújo',
        cpf: '111.222.333-44',
        endereco: { cep: '01001-000', rua: 'Praça da Sé', numero: '1', bairro: 'Sé', cidade: 'São Paulo', estado: 'SP', complemento: 'Lado ímpar' },
        dadosBancarios: { nomeBanco: 'Banco do Brasil', agencia: '1234', conta: '56789-0', tipoConta: 'CORRENTE', nomeTitular: 'Carlos Alberto Nobrega', cpfTitular: '111.222.333-44', cpfPix: true },
        ativo: true,
        acompanhante: {
          nome: 'Maria Nobrega',
          cpf: '999.888.777-66',
          endereco: { cep: '01001-000', rua: 'Praça da Sé', numero: '1', bairro: 'Sé', cidade: 'São Paulo', estado: 'SP' }
        }
      },
      {
        id: 2,
        nome: 'Fernando José',
        cpf: '222.333.444-55',
        endereco: { cep: '20000-000', rua: 'Av. Rio Branco', numero: '156', bairro: 'Centro', cidade: 'Rio de Janeiro', estado: 'RJ' },
        dadosBancarios: { nomeBanco: 'Itaú Unibanco', agencia: '0001', conta: '12345-X', tipoConta: 'POUPANCA', nomeTitular: 'Fernanda Montenegro', cpfTitular: '222.333.444-55', cpfPix: false },
        ativo: false,
      },
      {
        id: 3,
        nome: 'Aragão José Augustinho',
        cpf: '333.444.555-66',
        endereco: { cep: '03003-000', rua: 'Rua das Caravanas', numero: '10', bairro: 'Pari', cidade: 'São Paulo', estado: 'SP' },
        dadosBancarios: { nomeBanco: 'Bradesco', agencia: '4321', conta: '09876-5', tipoConta: 'CORRENTE', nomeTitular: 'Silvio Santos', cpfTitular: '333.444.555-66', cpfPix: true },
        ativo: true,
      }
    ];
    this.aplicarFiltros(); // Aplicar filtros ao carregar
  }

  selecionarParaEdicao(paciente: Paciente): void {
    this.pacienteParaEdicao = paciente;
    // Cria uma cópia profunda para o formulário
    this.formularioEdicao = JSON.parse(JSON.stringify(paciente));
    // Garante que a estrutura do acompanhante exista no formulário se não existir no paciente original
    if (this.formularioEdicao && !this.formularioEdicao.acompanhante) {
      // Não adiciona um acompanhante em branco por padrão,
      // o usuário pode optar por adicionar se necessário.
      // this.formularioEdicao.acompanhante = JSON.parse(JSON.stringify(this.novoAcompanhanteTemplate));
    }
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
  }

  cancelarEdicao(): void {
    this.pacienteParaEdicao = null;
    this.formularioEdicao = null;
  }

  salvarEdicao(): void {
    if (!this.formularioEdicao || !this.pacienteParaEdicao) return;

    this.isLoading = true;
    console.log('Salvando paciente:', this.formularioEdicao);

    // Simulação de API
    setTimeout(() => {
      const index = this.todosOsPacientes.findIndex(p => p.id === this.pacienteParaEdicao!.id);
      if (index !== -1) {
        this.todosOsPacientes[index] = JSON.parse(JSON.stringify(this.formularioEdicao));
        // Se o acompanhante tiver todos os campos de nome e cpf vazios, remove-o
        if (this.todosOsPacientes[index].acompanhante &&
          !this.todosOsPacientes[index].acompanhante?.nome &&
          !this.todosOsPacientes[index].acompanhante?.cpf) {
          delete this.todosOsPacientes[index].acompanhante;
        }
      }
      // Reaplicar filtros após salvar para garantir que a lista filtrada seja atualizada
      // se o nome ou status do paciente editado afetar os filtros atuais.
      this.aplicarFiltros();
      this.isLoading = false;
      this.cancelarEdicao(); // Limpa o formulário de edição
      alert('Paciente atualizado com sucesso! (Simulação)');
      window.scrollTo(0, 0);
    }, 1000);
  }

  alternarStatusAtivo(paciente: Paciente): void {
    const index = this.todosOsPacientes.findIndex(p => p.id === paciente.id);
    if (index !== -1) {
      this.todosOsPacientes[index].ativo = !this.todosOsPacientes[index].ativo;
      // Se estiver editando o mesmo paciente, atualiza o formulário também
      if (this.formularioEdicao && this.formularioEdicao.id === paciente.id) {
        this.formularioEdicao.ativo = this.todosOsPacientes[index].ativo;
      }
    }
    // Reaplicar filtros após alternar status para refletir a mudança na lista filtrada
    this.aplicarFiltros();
    // A mensagem de alerta deve usar o novo status do paciente
    const acao = this.todosOsPacientes[index].ativo ? 'ativado' : 'inativado';
    alert(`Paciente ${this.todosOsPacientes[index].nome} ${acao} com sucesso! (Simulação)`);
  }

  adicionarAcompanhanteFormulario(): void {
    if (this.formularioEdicao && !this.formularioEdicao.acompanhante) {
      this.formularioEdicao.acompanhante = JSON.parse(JSON.stringify(this.novoAcompanhanteTemplate));
    }
  }

  removerAcompanhanteFormulario(): void {
    if (this.formularioEdicao) {
      delete this.formularioEdicao.acompanhante;
    }
  }

  navegarParaNovoPaciente(): void {
    this.router.navigate(['/tfd/cadastrar-paciente-TFD']);
  }

  aplicarFiltros(): void {
    this.pacientesFiltrados = this.todosOsPacientes.filter(paciente => {
      const nomeMatch = this.filtroNome ? paciente.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) : true;

      let statusMatch = true;
      if (this.filtroStatus === 'ATIVOS') {
        statusMatch = paciente.ativo;
      } else if (this.filtroStatus === 'INATIVOS') {
        statusMatch = !paciente.ativo;
      }
      // Se filtroStatus for 'TODOS', statusMatch permanece true

      return nomeMatch && statusMatch;
    });
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroStatus = 'TODOS';
    this.aplicarFiltros();
  }
}
