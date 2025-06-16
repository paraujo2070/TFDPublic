import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: 'tfd',
    component: NavbarComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/TFD/tfd.routes').then(m => m.TFD_ROUTES)
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path:'listar-editar',
    component: NavbarComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/listar-editar/listar-editar.routes').then(m => m.LISTAR_EDITAR_ROUTES)
  },
  {
    path: 'cadastros',
    component: NavbarComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/cadastros/cadastros.routes').then(m => m.CADASTROS_ROUTES)
  },
  { path: '**', component: NotFoundComponent }
];