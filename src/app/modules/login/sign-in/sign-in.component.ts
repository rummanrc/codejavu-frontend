import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {RouteService} from "../../../services/route/route.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
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
