import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isMobileMenuOpen = false;
  
  // Objeto para controlar o estado de múltiplos dropdowns
  isDropdownOpen: { [key: string]: boolean } = {
    cadastro: false,
    gerenciar: false,
    configuracoes: false
  };

  // Timers para o delay no fechamento do dropdown
  private closeTimers: { [key: string]: any } = {};


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openDropdown(menu: string) {
    // Limpa qualquer timer de fechamento pendente para este menu
    if (this.closeTimers[menu]) {
      clearTimeout(this.closeTimers[menu]);
    }
    // Fecha outros dropdowns abertos
    Object.keys(this.isDropdownOpen).forEach(key => {
      if (key !== menu) {
        this.isDropdownOpen[key] = false;
      }
    });
    // Abre o dropdown atual
    this.isDropdownOpen[menu] = true;
  }

  closeDropdown(menu: string) {
    // Define um pequeno delay antes de fechar para permitir que o mouse se mova para o dropdown
    this.closeTimers[menu] = setTimeout(() => {
      this.isDropdownOpen[menu] = false;
    }, 100); // 100ms de delay
  }

  logout() {
    this.authService.simulateLogout(); // Ou seu método de logout real
    this.router.navigate(['/auth/login']);
    this.isMobileMenuOpen = false; // Fecha o menu mobile ao sair
  }
}
