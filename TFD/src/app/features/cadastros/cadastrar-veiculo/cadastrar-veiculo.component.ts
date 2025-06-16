import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastrar-veiculo',
  imports: [],
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrl: './cadastrar-veiculo.component.css'
})
export class CadastrarVeiculoComponent {

  constructor(){}

  cadastrarVeiculo(){
    console.log("Cadastrando Veiculo");
  }

}
