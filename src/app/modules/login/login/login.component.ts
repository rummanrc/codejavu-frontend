import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import {RouteService} from "../../../services/route/route.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) {
    this.loginForm = _fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  loginUser() {
    this._auth.logIn(this.loginForm.value).subscribe({
      next: (token) => {
        this._router.navigate([RouteService.SNIPPETS]).catch(err => console.log(err))
      },
      error: (msg) => {
        console.log('Error Log in: ', msg);
      }
  });
  }
}
