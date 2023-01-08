import {Component} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import {Router} from "@angular/router";
import {RouteService} from "./services/route/route.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _authService: AuthService, private _router: Router) { }
  logout() {
      this._authService.doLogout();
      this._router.navigate([RouteService.LOGIN]).catch(err => console.log(err));
  }
  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn
  }
  ngOnInit() { }
}
