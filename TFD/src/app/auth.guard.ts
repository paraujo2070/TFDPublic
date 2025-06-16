import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service'; // Se auth.service.ts está na pasta app/

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    return true; // Usuário está "logado" (token simulado existe), permite o acesso
  } else {
    // Usuário não está "logado", redireciona para a página de login
    return router.createUrlTree(['/auth/login']);
  }
};
