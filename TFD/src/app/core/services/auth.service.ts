import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private readonly SIMULATED_TOKEN_KEY = 'simulated_auth_token';

  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.SIMULATED_TOKEN_KEY);
    }
    return false;
  }

  hasSimulatedToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.SIMULATED_TOKEN_KEY) !== null;
    }
    return false;
  }

  simulateLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.SIMULATED_TOKEN_KEY, 'dummy-token-value');
      console.log('Token simulado armazenado no localStorage.');
      this.router.navigate(['/home/pagina-inicial']);
    } else {
      console.log('SimulateLogin: Não é possível usar localStorage no servidor.');
    }
  }

  simulateLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.SIMULATED_TOKEN_KEY);
      console.log('Token simulado removido do localStorage.');
      this.router.navigate(['/auth/login']);
    } else {
      console.log('SimulateLogout: Não é possível usar localStorage no servidor.');
    }
  }

}
