import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RouteService} from "../../services/route/route.service";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {
    path: RouteService.LOGIN,
    component: LoginComponent
  },
  {
    path: RouteService.SIGNUP,
    component: SignupComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
