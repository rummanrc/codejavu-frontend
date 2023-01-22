import { Component } from '@angular/core';
import {route} from "../../constants";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor() { }
}
