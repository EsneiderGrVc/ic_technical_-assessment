import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User_Res } from '../models/user.interface';
import { Router } from '@angular/router';

export type AuthWindowType = 'login' | 'signup' | 'unset';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/auth';

  public windowShown = signal<AuthWindowType>('unset');

  constructor(private http: HttpClient, private router: Router) {}

  public setWindowView(authView: AuthWindowType) {
    this.windowShown.set(authView);
  }

  public signUp(req: any) {
    this.http.post(`${this.url}/sign-up/`, req);
  }

  public logIn(req: any) {
    this.http.get(`${this.url}/log-in/`, req);
  }

  public logInAsAnonymous() {
    this.http.get<User_Res>(`${this.url}/anonymous_login/`).subscribe((res) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/calc']);
    });
  }
}
