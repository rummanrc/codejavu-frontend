import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.doLogout()
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
