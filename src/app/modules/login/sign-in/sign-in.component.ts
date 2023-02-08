import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {route} from "../../../constants";
import {ErrorService} from "../../../services/error/error.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _error: ErrorService
  ) {
    this.loginForm = _fb.group({
      email: [''],
      password: [''],
    });
  }

  loginUser(): void {
    this._auth.logIn(this.loginForm.value).subscribe({
      next: (token) => {
        this._error.insertMessage("Login Success");
        this._router.navigate([route.SNIPPETS])
          .catch(err => this._error.insertMessage("Something went wrong.", err));
      },
      error: (msg) => {
        this._error.insertMessage("Login Failed. Try Again.", msg);
      }
    });
  }
}
