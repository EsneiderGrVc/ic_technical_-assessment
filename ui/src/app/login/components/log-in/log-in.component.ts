import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../sign-up/sign-up.component.css'],
})
export class LogInComponent {
  public singInForm = new FormGroup({
    username: new FormControl<null | string>(null, Validators.required),
    password: new FormControl<null | string>(null, Validators.required),
  });

  constructor(public authService: AuthService) {}
  public onSubmit() {
    this.authService.signUp(this.singInForm.value);
  }
}
