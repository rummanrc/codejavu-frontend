import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from "@angular/router";
import {route} from "./constants";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {

  }
  get isLoggedInComp(): boolean {
    return this._authService.isLoggedIn;
  }
  logout(): void {
      // this._authService.doLogout();
      // this._router.navigate([route.LOGIN]).catch(err => console.log(err));
  }
}
