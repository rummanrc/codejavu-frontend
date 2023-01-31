import {Component} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {route} from "../../../../constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  logout(): void {
    this._authService.doLogout();
    this._router.navigate([route.LOGIN]).catch(err => console.log(err));
  }
}
