import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { authGuard } from '../../auth.guard';

// Define as rotas para a funcionalidade de autenticação
export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent, 
    title: 'Login' 
  },
  {
    path: 'esqueceu-senha',
    component: EsqueceuSenhaComponent,
    title: 'Esqueceu a senha?'
  },
  {
    path: 'nav',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'alterar-senha',
        component: AlterarSenhaComponent,
        title: 'Alterar Senha'
      },
    ]
  },
  {
    path: '', 
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];