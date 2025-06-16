import { Routes } from "@angular/router";
import { PaginaInicialComponent } from "./pagina-inicial/pagina-inicial.component";

export const HOME_ROUTES: Routes = 
[
{ 
    path: 'pagina-inicial', component: PaginaInicialComponent, title: 'Página Inicial'
},
{ 
    path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' 
},
]