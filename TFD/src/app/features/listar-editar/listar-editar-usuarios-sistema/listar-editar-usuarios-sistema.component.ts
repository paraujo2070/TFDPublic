import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UsuarioSistema {
  id: number;  // Assuming you have a user ID
  nomeCompleto: string;
  email: string;
  cargo: string;
  ativo: boolean;
}

@Component({
  selector: 'app-listar-editar-usuarios-sistema',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-editar-usuarios-sistema.component.html',
  styleUrls: ['./listar-editar-usuarios-sistema.component.css']
})
export class ListarEditarUsuariosSistemaComponent implements OnInit {

  usuarios: UsuarioSistema[] = [];
  usuariosFiltrados: UsuarioSistema[] = [];
  usuarioEmEdicao: UsuarioSistema | null = null;
  filtroNomeUsuario: string = '';

  ngOnInit(): void {
    this.carregarUsuarios();
    this.aplicarFiltro(); // Aplicar filtro inicialmente para carregar usuariosFiltrados
  }

  // --- Mock Data (Substitua com sua lógica de serviço) ---
  private carregarUsuarios(): void {
    // In a real app, this would fetch data from an API.
    this.usuarios = [
      { id: 1, nomeCompleto: 'João da Silva', email: 'joao@example.com', cargo: 'coordenador', ativo: true },
      { id: 2, nomeCompleto: 'Maria Souza', email: 'maria@example.com', cargo: 'operador', ativo: true },
      { id: 3, nomeCompleto: 'Pedro Almeida', email: 'pedro@example.com', cargo: 'secretario', ativo: false }
    ];
    this.usuariosFiltrados = [...this.usuarios]; // Inicializa a lista filtrada
  }

  private atualizarUsuario(usuario: UsuarioSistema): void {
    // In a real app, this would send the updated user data to your API.
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = usuario;
      this.aplicarFiltro(); // Reaplicar filtro após atualização
    }
  }
  // --- End of Mock Data ---


  editarUsuario(usuario: UsuarioSistema): void {
    // Create a copy to avoid directly modifying the original object in the list.
    this.usuarioEmEdicao = { ...usuario };
  }

  salvarUsuario(): void {
    if (this.usuarioEmEdicao) {
      // Update the user in your data store (mocked here)
      this.atualizarUsuario(this.usuarioEmEdicao);
      this.usuarioEmEdicao = null; // Exit edit mode
      this.aplicarFiltro(); // Garante que a lista seja atualizada após salvar
      alert('Usuário atualizado com sucesso!');
    }
  }

  cancelarEdicao(): void {
    this.usuarioEmEdicao = null;
  }

  aplicarFiltro(): void {
    if (!this.filtroNomeUsuario) {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nomeCompleto.toLowerCase().includes(this.filtroNomeUsuario.toLowerCase())
      );
    }
  }

  limparFiltros(): void {
    this.filtroNomeUsuario = '';
    this.aplicarFiltro();
  }
}