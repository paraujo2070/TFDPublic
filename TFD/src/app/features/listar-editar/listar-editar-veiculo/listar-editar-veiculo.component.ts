import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interface para o objeto Veiculo
interface Veiculo {
  id: string; // Ou number, dependendo do seu backend
  placa: string;
  renavam: string;
  qtdPassageiros: number;
  marca: string;
  modelo: string;
  anoVeiculo: number;
  cor: string;
  tipoA: boolean;
  tipoB: boolean;
  tipoC: boolean;
  tipoD: boolean;
  tipoE: boolean;
}

// Mock VeiculoService - Substitua por seu serviço real
class VeiculoService {
  private veiculos: Veiculo[] = [
    { id: '1', placa: 'BRA2E19', renavam: '12345678901', qtdPassageiros: 5, marca: 'Volkswagen', modelo: 'Gol', anoVeiculo: 2020, cor: 'Branco', tipoA: false, tipoB: true, tipoC: false, tipoD: false, tipoE: false },
    { id: '2', placa: 'MER1C0S', renavam: '98765432109', qtdPassageiros: 7, marca: 'Fiat', modelo: 'Toro', anoVeiculo: 2022, cor: 'Vermelho', tipoA: false, tipoB: true, tipoC: true, tipoD: false, tipoE: false },
    { id: '3', placa: 'ABC1D23', renavam: '11223344556', qtdPassageiros: 2, marca: 'Honda', modelo: 'CB300', anoVeiculo: 2023, cor: 'Preto', tipoA: true, tipoB: false, tipoC: false, tipoD: false, tipoE: false },
  ];

  async getVeiculos(): Promise<Veiculo[]> {
    console.log('Service: getVeiculos called');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da API
    return [...this.veiculos];
  }

  async getVeiculoByPlaca(placa: string): Promise<Veiculo[]> {
    console.log(`Service: getVeiculoByPlaca called with placa: ${placa}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da API
    if (!placa) {
      return [...this.veiculos];
    }
    return this.veiculos.filter(v => v.placa.toLowerCase().includes(placa.toLowerCase()));
  }

  async updateVeiculo(veiculoAtualizado: Veiculo): Promise<Veiculo> {
    console.log('Service: updateVeiculo called with', veiculoAtualizado);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da API
    const index = this.veiculos.findIndex(v => v.id === veiculoAtualizado.id);
    if (index !== -1) {
      this.veiculos[index] = { ...veiculoAtualizado };
      return { ...this.veiculos[index] };
    }
    throw new Error('Veículo não encontrado para atualização');
  }
}
// Fim do Mock VeiculoService

@Component({
  selector: 'app-listar-editar-veiculo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-editar-veiculo.component.html',
  styleUrls: ['./listar-editar-veiculo.component.css'], // Você pode criar este arquivo se precisar de estilos específicos
  providers: [VeiculoService] // Adiciona o serviço mock aos providers do componente
})
export class ListarEditarVeiculoComponent implements OnInit {
  filtroPlaca: string = '';
  isLoading: boolean = false;
  todosOsVeiculos: Veiculo[] = [];
  veiculosFiltrados: Veiculo[] = [];
  veiculoParaEdicao: Veiculo | null = null;
  formularioEdicao: Veiculo | null = null;

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.listarTodosVeiculos();
  }

  async buscarVeiculos(): Promise<void> {
    this.isLoading = true;
    this.veiculoParaEdicao = null; // Limpa edição ao buscar
    try {
      // Se o filtro estiver vazio, poderia optar por listar todos ou nenhum,
      // aqui vamos filtrar com base no que foi digitado ou listar todos se vazio.
      if (this.filtroPlaca.trim() === '') {
         this.veiculosFiltrados = [...this.todosOsVeiculos];
      } else {
        const resultado = await this.veiculoService.getVeiculoByPlaca(this.filtroPlaca);
        this.veiculosFiltrados = resultado;
      }
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      this.veiculosFiltrados = [];
      // Adicionar feedback para o usuário (ex: toastr, alert)
    } finally {
      this.isLoading = false;
    }
  }

  async listarTodosVeiculos(): Promise<void> {
    this.isLoading = true;
    this.filtroPlaca = ''; // Limpa o filtro
    this.veiculoParaEdicao = null; // Limpa edição
    try {
      this.todosOsVeiculos = await this.veiculoService.getVeiculos();
      this.veiculosFiltrados = [...this.todosOsVeiculos];
    } catch (error) {
      console.error('Erro ao listar todos os veículos:', error);
      this.todosOsVeiculos = [];
      this.veiculosFiltrados = [];
      // Adicionar feedback para o usuário
    } finally {
      this.isLoading = false;
    }
  }

  selecionarParaEdicao(veiculo: Veiculo): void {
    this.veiculoParaEdicao = { ...veiculo }; // Cria uma cópia para edição
    this.formularioEdicao = { ...veiculo }; // Cria uma cópia para o formulário
    // Idealmente, rolar a tela para o formulário de edição se estiver fora da viewport
  }

  async salvarEdicao(): Promise<void> {
    if (!this.formularioEdicao) {
      console.warn('Nenhum veículo selecionado para salvar.');
      return;
    }
    this.isLoading = true;
    try {
      const veiculoAtualizado = await this.veiculoService.updateVeiculo(this.formularioEdicao);
      // Atualizar a lista local
      const indexTodos = this.todosOsVeiculos.findIndex(v => v.id === veiculoAtualizado.id);
      if (indexTodos !== -1) {
        this.todosOsVeiculos[indexTodos] = { ...veiculoAtualizado };
      }
      // Atualizar a lista filtrada (se aplicável)
      const indexFiltrados = this.veiculosFiltrados.findIndex(v => v.id === veiculoAtualizado.id);
      if (indexFiltrados !== -1) {
        this.veiculosFiltrados[indexFiltrados] = { ...veiculoAtualizado };
      }
      
      console.log('Veículo atualizado com sucesso:', veiculoAtualizado);
      // Adicionar feedback de sucesso para o usuário
      this.cancelarEdicao(); // Volta para a lista
      await this.buscarVeiculos(); // Re-filtra ou lista todos para refletir a mudança
    } catch (error) {
      console.error('Erro ao salvar edição do veículo:', error);
      // Adicionar feedback de erro para o usuário
    } finally {
      this.isLoading = false;
    }
  }

  cancelarEdicao(): void {
    this.veiculoParaEdicao = null;
    this.formularioEdicao = null;
  }
}
