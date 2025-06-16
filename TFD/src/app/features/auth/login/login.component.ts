import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule, 
    RouterLink
  ],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    console.log('Tentativa de login simulado...');
    this.authService.simulateLogin();
  }
}