import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import {Router} from "@angular/router";
import {RouteService} from "./shared/services/route/route.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }
  logout() {
    this.authService.doLogout();
    this.router.navigate([RouteService.LOGIN]);
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
