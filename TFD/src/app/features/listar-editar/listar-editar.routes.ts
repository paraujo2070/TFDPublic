import { Routes } from "@angular/router";
import { ListarEditarMotoristaComponent } from "./listar-editar-motorista/listar-editar-motorista.component";
import { ListarEditarVeiculoComponent } from "./listar-editar-veiculo/listar-editar-veiculo.component";
import { ListarEditarViagemTfdComponent } from "./listar-editar-viagem-tfd/listar-editar-viagem-tfd.component";
import { ListarEditarPacienteTfdComponent } from "./listar-editar-paciente-tfd/listar-editar-paciente-tfd.component";
import { ListarEditarDeclaracaoTfdComponent } from "./listar-editar-declaracao-tfd/listar-editar-declaracao-tfd.component";
import { ListarEditarViagemHemodialiseComponent } from "./listar-editar-viagem-hemodialise/listar-editar-viagem-hemodialise.component";
import { ListarEditarViagemAmbulanciaComponent } from "./listar-editar-viagem-ambulancia/listar-editar-viagem-ambulancia.component";
import { ListarEditarViagemExtraComponent } from "./listar-editar-viagem-extra/listar-editar-viagem-extra.component";
import { ListarEditarUsuariosSistemaComponent } from "./listar-editar-usuarios-sistema/listar-editar-usuarios-sistema.component";

export const LISTAR_EDITAR_ROUTES: Routes = 
[
{ 
    path: 'gerenciar-motoristas', component: ListarEditarMotoristaComponent, title: 'Gerenciar Motoristas' 
},
{
    path: 'gerenciar-veiculos', component: ListarEditarVeiculoComponent, title: 'Gerenciar Veículos'
},
{
    path:'gerenciar-viagem-tfd', component: ListarEditarViagemTfdComponent, title: 'Gerenciar Viagens TFD'
},
{
    path: 'gerenciar-paciente-tfd', component: ListarEditarPacienteTfdComponent, title: 'Gerenciar Pacientes TFD'
},
{
    path: 'gerenciar-declaracao-tfd', component: ListarEditarDeclaracaoTfdComponent, title: 'Gerenciar Declarações TFD'
},
{
    path: 'gerenciar-viagem-hemodialise', component: ListarEditarViagemHemodialiseComponent, title: 'Gerenciar Viagens Hemodialise'
},
{
    path: 'gerenciar-viagem-ambulancia', component: ListarEditarViagemAmbulanciaComponent, title: 'Gerenciar Viagens Ambulância'
},
{
    path: 'gerenciar-viagem-extra', component: ListarEditarViagemExtraComponent, title: 'Gerenciar Viagens Extra'
},
{
    path: 'gerenciar-usuarios-sistema', component: ListarEditarUsuariosSistemaComponent, title: 'Gerenciar Usuários do Sistema'
}
]