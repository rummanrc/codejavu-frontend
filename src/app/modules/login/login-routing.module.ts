import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login.component";
import {RouteService} from "../../services/route/route.service";
import {SignupComponent} from "./signup/signup.component";
import {SignInComponent} from "./sign-in/sign-in.component";

const routes: Routes = [
  {
    path: RouteService.LOGIN,
    component: SignInComponent
  },
  {
    path: RouteService.SIGNUP,
    component: SignupComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
