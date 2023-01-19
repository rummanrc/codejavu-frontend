import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {route} from "../../constants";

const routes: Routes = [
  {
    path: route.LOGIN,
    component: SignInComponent
  },
  {
    path: route.SIGNUP,
    component: SignupComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
