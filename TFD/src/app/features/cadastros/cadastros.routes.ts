import { Routes } from "@angular/router";
import { CadastrarMotoristaComponent } from "./cadastrar-motorista/cadastrar-motorista.component";
import { CadastrarVeiculoComponent } from "./cadastrar-veiculo/cadastrar-veiculo.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ListarEditarMotoristaComponent } from "../listar-editar/listar-editar-motorista/listar-editar-motorista.component";

export const CADASTROS_ROUTES: Routes = 
[
{ 
    path: 'cadastrar-motorista', component: CadastrarMotoristaComponent, title: 'Cadastrar Motorista' 
},
{ 
    path: 'cadastrar-veiculo', component: CadastrarVeiculoComponent, title: 'Cadastrar Veículo' 
},
{ 
    path: 'cadastro', component: CadastroComponent, title: 'Registre-se' 
},
]