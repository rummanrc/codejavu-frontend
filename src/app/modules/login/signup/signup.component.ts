import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ErrorService} from "../../../services/error/error.service";
import {route} from "../../../constants";

@Component({
  selector: 'app-signup',
  templateUrl: '/signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private _error: ErrorService
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  registerUser(): void {
    this.authService.signUp(this.signupForm.value)
      .subscribe({
        next: (res) => {
          if (res) {
            this.signupForm.reset();
            this.router.navigate([route.LOGIN]);
          }
        },
        error: (err) => {
          this._error.insertMessage("Registration Failed.", err);
        }
      });
  }
}
