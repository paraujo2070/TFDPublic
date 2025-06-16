import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueceu-senha',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css'
})
export class EsqueceuSenhaComponent {
  solicitarRedefinicao() {
    throw new Error('Method not implemented.');
}

}
