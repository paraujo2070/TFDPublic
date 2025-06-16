import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MotoristaService } from '../../core/services/motorista.service'; // Crie este serviço
// import { Motorista } from '../../core/models/motorista.model'; // Crie este modelo

// Interface e Serviço Mock (Remova e use os reais quando criados)
export interface Motorista {
  id: string;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  telefone: string;
  numeroCnh: string;
  validadeCnh: string;
  tipoA: boolean;
  tipoB: boolean;
  tipoC: boolean;
  tipoD: boolean;
  tipoE: boolean;
  ear: 'sim' | 'nao' | '';
  placaVeiculo: string;
}

export class MockMotoristaService {
  private motoristas: Motorista[] = [
    { id: '1', nomeCompleto: 'João da Silva Sauro', cpf: '11122233344', dataNascimento: '1980-01-15', nomeMae: 'Maria Silva', telefone: '999998888', numeroCnh: '12345678901', validadeCnh: '2025-10-20', tipoA: false, tipoB: true, tipoC: false, tipoD: true, tipoE: false, ear: 'sim', placaVeiculo: 'ABC1D23' },
    { id: '2', nomeCompleto: 'Maria Oliveira Santos', cpf: '22233344455', dataNascimento: '1990-05-25', nomeMae: 'Ana Oliveira', telefone: '988887777', numeroCnh: '09876543210', validadeCnh: '2024-12-15', tipoA: true, tipoB: true, tipoC: false, tipoD: false, tipoE: false, ear: 'nao', placaVeiculo: 'DEF2E34' },
  ];

  getMotoristas(filtroNome?: string): Promise<Motorista[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (filtroNome) {
          resolve(this.motoristas.filter(m => m.nomeCompleto.toLowerCase().includes(filtroNome.toLowerCase())));
        } else {
          resolve([...this.motoristas]);
        }
      }, 500);
    });
  }

  updateMotorista(motorista: Motorista): Promise<Motorista> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = this.motoristas.findIndex(m => m.id === motorista.id);
        if (index !== -1) {
          this.motoristas[index] = { ...motorista };
          resolve({ ...this.motoristas[index] });
        }
      }, 500);
    });
  }
}
// Fim do Mock

@Component({
  selector: 'app-listar-editar-motorista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-editar-motorista.component.html',
  styleUrls: ['./listar-editar-motorista.component.css'],
  // providers: [MotoristaService] // Use o serviço real aqui
  providers: [{ provide: 'MotoristaService', useClass: MockMotoristaService }] // Usando Mock
})
export class ListarEditarMotoristaComponent implements OnInit {
  // private motoristaService = inject(MotoristaService); // Injeção do serviço real
  private motoristaService: MockMotoristaService = inject('MotoristaService' as any); // Injeção do Mock

  filtroNome: string = '';
  motoristas: Motorista[] = [];
  motoristasFiltrados: Motorista[] = [];
  motoristaParaEdicao: Motorista | null = null;
  formularioEdicao: Motorista | null = null; // Cópia para o formulário

  isLoading: boolean = false;

  ngOnInit(): void {
    this.listarTodosMotoristas();
  }

  buscarMotoristas(): void {
    this.isLoading = true;
    this.motoristaParaEdicao = null; // Esconde o formulário de edição ao buscar
    this.motoristaService.getMotoristas(this.filtroNome).then(data => {
      this.motoristasFiltrados = data;
      this.isLoading = false;
    }).catch(() => this.isLoading = false);
  }

  listarTodosMotoristas(): void {
    this.filtroNome = '';
    this.buscarMotoristas();
  }

  selecionarParaEdicao(motorista: Motorista): void {
    this.motoristaParaEdicao = motorista;
    // Cria uma cópia profunda do objeto para o formulário, para não alterar a lista diretamente
    this.formularioEdicao = JSON.parse(JSON.stringify(motorista));
  }

  salvarEdicao(): void {
    if (this.formularioEdicao) {
      this.isLoading = true;
      this.motoristaService.updateMotorista(this.formularioEdicao).then(motoristaAtualizado => {
        // Atualiza na lista original e na filtrada
        this.listarTodosMotoristas(); // Recarrega a lista para refletir a mudança
        this.motoristaParaEdicao = null; // Esconde o formulário
        this.formularioEdicao = null;
        this.isLoading = false;
        alert('Motorista atualizado com sucesso!');
      }).catch(() => this.isLoading = false);
    }
  }

  cancelarEdicao(): void {
    this.motoristaParaEdicao = null;
    this.formularioEdicao = null;
  }
}