import { Routes } from "@angular/router";
import { CadastrarViagemTFDComponent } from "./pages/cadastrar-viagem-tfd/cadastrar-viagem-tfd.component";
import { CadastrarPacienteTFDComponent } from "./pages/cadastrar-paciente-tfd/cadastrar-paciente-tfd.component";
import { CadastrarDocumentoTFDComponent } from "./pages/cadastrar-documento-tfd/cadastrar-documento-tfd.component";
import { CadastrarViagemHemodialiseComponent } from "./pages/cadastrar-viagem-hemodialise/cadastrar-viagem-hemodialise.component";
import { RelatorioPagamentoTfdComponent } from "./pages/relatorio-pagamento-tfd/relatorio-pagamento-tfd.component";
import { CadastrarViagemAmbulanciaComponent } from "./pages/cadastrar-viagem-ambulancia/cadastrar-viagem-ambulancia.component";
import { CadastrarViagemExtraComponent } from "./pages/cadastrar-viagem-extra/cadastrar-viagem-extra.component";

export const TFD_ROUTES: Routes = 
[
{ 
    path: 'cadastrar-viagem', component: CadastrarViagemTFDComponent, title: 'Cadastro Viagens' 
},
{ 
    path: 'cadastrar-paciente-TFD', component: CadastrarPacienteTFDComponent, title: 'Cadastro Paciente TFD' 
},
{ 
    path: 'cadastrar-documento-TFD', component: CadastrarDocumentoTFDComponent, title: 'Documentação TFD' 
},
{ 
    path: 'cadastrar-viagem-hemodialise', component: CadastrarViagemHemodialiseComponent, title: 'Viagem hemodiálise' 
},
{ 
    path: 'relatorio-pagamento-tfd', component: RelatorioPagamentoTfdComponent, title: 'relatório TFD' 
},
{
    path: 'cadastrar-viagem-ambulancia', component: CadastrarViagemAmbulanciaComponent, title: 'Cadastrar Viagem de Ambulância'
},
{
    path: 'cadastrar-viagem-extra', component: CadastrarViagemExtraComponent, title: 'Cadastrar Viagem Extra'
}
]