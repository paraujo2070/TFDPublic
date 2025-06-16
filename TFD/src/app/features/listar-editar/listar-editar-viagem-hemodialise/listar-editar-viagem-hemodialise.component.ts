import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common'; // Necessário para *ngFor, *ngIf, ngClass, pipe de data, etc.

// Interfaces para a estrutura dos dados
interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Paciente {
  nomeCompleto: string;
  dataNascimento: string;
  nomeMae: string;
  cpf: string;
  cartaoSus: string;
  telefone: string;
  endereco: Endereco;
}

interface Acompanhante {
  nomeCompleto?: string;
  cpf?: string;
  cartaoSus?: string;
}

interface DiasHemodialise {
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  domingo: boolean;
}

interface LocalHemodialise {
  nomeLocal: string;
  telefoneLocal?: string;
  enderecoLocal: string;
  dias: DiasHemodialise;
}

interface ViagemHemodialise {
  id: string; // Identificador único para a viagem
  paciente: Paciente;
  acompanhante?: Acompanhante;
  hemodialise: LocalHemodialise;
  dataReferencia: string; // Data da viagem/registro, formato YYYY-MM-DD
  status: 'ativo' | 'inativo' | string; // Status da viagem/tratamento
}

interface FiltrosViagem {
  nomePaciente: string;
  data: string; // Formato YYYY-MM-DD
}

interface DiaSemanaCheckbox {
  id: keyof DiasHemodialise;
  label: string;
}

@Component({
  selector: 'app-listar-editar-viagem-hemodialise',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './listar-editar-viagem-hemodialise.component.html',
  styleUrls: ['./listar-editar-viagem-hemodialise.component.css'] // Se você tiver estilos específicos
})
export class ListarEditarViagemHemodialiseComponent implements OnInit {

  filtrosViagem: FiltrosViagem = {
    nomePaciente: '',
    data: ''
  };

  todasAsViagens: ViagemHemodialise[] = [];
  viagensFiltradas: ViagemHemodialise[] = [];
  viagemEditavel: ViagemHemodialise | null = null;

  editViagemForm!: FormGroup;

  isLoadingViagens: boolean = false;
  isLoadingSalvarViagem: boolean = false;
  filtroViagemAplicado: boolean = false;

  diasSemana: DiaSemanaCheckbox[] = [
    { id: 'segunda', label: 'Segunda' },
    { id: 'terca', label: 'Terça' },
    { id: 'quarta', label: 'Quarta' },
    { id: 'quinta', label: 'Quinta' },
    { id: 'sexta', label: 'Sexta' },
    { id: 'sabado', label: 'Sábado' },
    { id: 'domingo', label: 'Domingo' }
  ];

  @ViewChild('filtroViagemForm') filtroViagemNgForm!: NgForm;


  constructor(private fb: FormBuilder) {
    this.inicializarFormularioEdicao();
  }

  ngOnInit(): void {
    this.carregarViagensIniciais();
  }

  inicializarFormularioEdicao(): void {
    this.editViagemForm = this.fb.group({
      paciente: this.fb.group({
        nomeCompleto: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        nomeMae: ['', Validators.required],
        cpf: ['', Validators.required], // Adicionar validadores específicos de CPF se necessário
        cartaoSus: ['', Validators.required],
        telefone: ['', Validators.required],
        endereco: this.fb.group({
          rua: ['', Validators.required],
          numero: ['', Validators.required],
          bairro: ['', Validators.required],
          cidade: ['', Validators.required],
          estado: ['', Validators.required],
          cep: ['', Validators.required] // Adicionar validadores de CEP se necessário
        })
      }),
      acompanhante: this.fb.group({
        nomeCompleto: [''],
        cpf: [''],
        cartaoSus: ['']
      }),
      hemodialise: this.fb.group({
        nomeLocal: ['', Validators.required],
        telefoneLocal: [''],
        enderecoLocal: ['', Validators.required],
        dias: this.fb.group({
          segunda: [false],
          terca: [false],
          quarta: [false],
          quinta: [false],
          sexta: [false],
          sabado: [false],
          domingo: [false]
        })
      }),
      dataReferencia: [{ value: '', disabled: true }, Validators.required], // Data de referência não editável
      status: ['', Validators.required] // Novo campo de status
    });
  }

  carregarViagensIniciais(): void {
    this.isLoadingViagens = true;
    // Simulação de chamada de API
    setTimeout(() => {
      this.todasAsViagens = [
        {
          id: 'v1',
          paciente: {
            nomeCompleto: 'Carlos Alberto Nobrega',
            dataNascimento: '1970-05-15',
            nomeMae: 'Maria Nobrega',
            cpf: '123.456.789-01',
            cartaoSus: '987654321098765',
            telefone: '(11) 98888-7777',
            endereco: { rua: 'Rua das Palmeiras', numero: '100', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', cep: '01000-000' }
          },
          acompanhante: { nomeCompleto: 'Ana Nobrega', cpf: '111.222.333-44' },
          hemodialise: {
            nomeLocal: 'Clínica Renal Vida',
            enderecoLocal: 'Av. Saúde, 500 - São Paulo, SP',
            telefoneLocal: '(11) 3333-4444',
            dias: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false, domingo: false }
          },
          dataReferencia: '2023-10-20',
          status: 'ativo'
        },
        {
          id: 'v2',
          paciente: {
            nomeCompleto: 'Fernanda Montenegro Silva',
            dataNascimento: '1965-12-01',
            nomeMae: 'Joana Silva',
            cpf: '098.765.432-10',
            cartaoSus: '123456789012345',
            telefone: '(21) 97777-6666',
            endereco: { rua: 'Rua das Gaivotas', numero: '20B', bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ', cep: '22000-000' }
          },
          hemodialise: {
            nomeLocal: 'Hospital do Rim RJ',
            enderecoLocal: 'Rua da Praia, 10 - Rio de Janeiro, RJ',
            dias: { segunda: false, terca: true, quarta: false, quinta: true, sexta: false, sabado: true, domingo: false }
          },
          dataReferencia: '2023-11-05',
          status: 'ativo'
        },
        {
          id: 'v3',
          paciente: {
            nomeCompleto: 'José Pereira Santos',
            dataNascimento: '1980-02-25',
            nomeMae: 'Clara Santos',
            cpf: '555.666.777-88',
            cartaoSus: '555555555555555',
            telefone: '(31) 95555-4444',
            endereco: { rua: 'Avenida Brasil', numero: '1500', bairro: 'Funcionários', cidade: 'Belo Horizonte', estado: 'MG', cep: '30000-000' }
          },
          hemodialise: {
            nomeLocal: 'Centro Nefrológico BH',
            enderecoLocal: 'Rua dos Otoni, 300 - Belo Horizonte, MG',
            dias: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false, domingo: false }
          },
          dataReferencia: '2023-09-15',
          status: 'inativo' // Exemplo de paciente inativo
        }
      ];
      this.viagensFiltradas = [...this.todasAsViagens];
      this.isLoadingViagens = false;
    }, 1000);
  }

  aplicarFiltrosViagem(): void {
    this.isLoadingViagens = true;
    this.filtroViagemAplicado = true;
    this.viagemEditavel = null;

    setTimeout(() => {
      let resultado = [...this.todasAsViagens];
      if (this.filtrosViagem.nomePaciente) {
        resultado = resultado.filter(v =>
          v.paciente.nomeCompleto.toLowerCase().includes(this.filtrosViagem.nomePaciente.toLowerCase())
        );
      }
      if (this.filtrosViagem.data) {
        // Comparar apenas a data, ignorando a hora se houver
        resultado = resultado.filter(v => v.dataReferencia === this.filtrosViagem.data);
      }
      this.viagensFiltradas = resultado;
      this.isLoadingViagens = false;
    }, 500);
  }

  listarTodasViagens(): void {
    this.isLoadingViagens = true;
    this.filtroViagemAplicado = false;
    this.viagemEditavel = null;
    this.filtrosViagem = { nomePaciente: '', data: '' };
    if (this.filtroViagemNgForm) {
      this.filtroViagemNgForm.resetForm(this.filtrosViagem);
    }
    setTimeout(() => {
      this.viagensFiltradas = [...this.todasAsViagens];
      this.isLoadingViagens = false;
    }, 500);
  }

  selecionarViagemParaEdicao(viagem: ViagemHemodialise): void {
    this.viagemEditavel = JSON.parse(JSON.stringify(viagem)); // Deep copy
    if (this.viagemEditavel) {
      this.editViagemForm.patchValue(this.viagemEditavel);
      this.editViagemForm.get('dataReferencia')?.setValue(this.viagemEditavel.dataReferencia); // Garante que a data de referência seja setada
      this.editViagemForm.get('dataReferencia')?.disable(); // Mantém desabilitado
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  salvarAlteracoesViagem(): void {
    if (this.editViagemForm.invalid || !this.viagemEditavel) {
      // Marcar todos os campos como "touched" para exibir mensagens de erro
      Object.values(this.editViagemForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(innerControl => innerControl.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      console.error("Formulário inválido ou viagem não selecionada.");
      return;
    }

    this.isLoadingSalvarViagem = true;
    const dadosFormulario = this.editViagemForm.getRawValue(); // getRawValue para incluir campos desabilitados como dataReferencia

    // Simulação de chamada de API para salvar
    console.log('Salvando alterações para a viagem ID:', this.viagemEditavel.id);
    console.log('Dados do formulário:', dadosFormulario);

    setTimeout(() => {
      const index = this.todasAsViagens.findIndex(v => v.id === this.viagemEditavel!.id);
      if (index !== -1) {
        // Atualiza o objeto na lista 'todasAsViagens'
        // É importante garantir que o ID não seja perdido e que a dataReferencia (que estava desabilitada) seja mantida.
        this.todasAsViagens[index] = {
          ...this.todasAsViagens[index], // Mantém propriedades não editáveis como ID
          ...dadosFormulario,
          id: this.viagemEditavel!.id, // Garante que o ID original seja mantido
          dataReferencia: this.viagemEditavel!.dataReferencia // Garante que a data de referência original seja mantida
        };
      }

      this.isLoadingSalvarViagem = false;
      this.viagemEditavel = null;
      this.editViagemForm.reset();
      this.inicializarFormularioEdicao(); // Reinicializa para limpar validadores e valores default

      this.aplicarFiltrosViagem(); // Ou this.listarTodasViagens() para atualizar a lista
      console.log('Alterações da viagem salvas com sucesso!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  cancelarEdicaoViagem(): void {
    this.viagemEditavel = null;
    this.editViagemForm.reset();
    this.inicializarFormularioEdicao();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
