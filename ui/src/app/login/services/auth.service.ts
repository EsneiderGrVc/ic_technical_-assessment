import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export type AuthWindowType = 'login' | 'signup' | 'unset';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/auth';

  public windowShown = signal<AuthWindowType>('unset');

  constructor(private http: HttpClient) {}

  public setWindowView(authView: AuthWindowType) {
    this.windowShown.set(authView);
  }

  public signUp(req: any) {
    this.http.post(`${this.url}/sign-up/`, req);
  }

  public logIn(req: any) {
    this.http.get(`${this.url}/log-in/`, req);
  }

  public logInAsAnonymous(req: any) {
    this.http.get(`${this.url}/log-in/`, req);
  }
}
