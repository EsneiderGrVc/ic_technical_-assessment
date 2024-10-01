import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../pages/auth-page/auth-page.component.css',
  ],
})
export class SignUpComponent {
  public singUpForm = new FormGroup({
    username: new FormControl<null | string>(null, Validators.required),
    password: new FormControl<null | string>(null, Validators.required),
  });

  constructor(public authService: AuthService) {}

  public onSubmit() {
    this.authService.signUp(this.singUpForm.value);
  }
}
