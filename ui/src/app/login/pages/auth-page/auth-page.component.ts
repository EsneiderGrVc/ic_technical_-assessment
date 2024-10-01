import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export type AuthWindow = 'login' | 'signup' | 'unset';

@Component({
  selector: 'app-login-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  constructor(public authService: AuthService) {}
}
