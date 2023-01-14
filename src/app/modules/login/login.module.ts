import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup/signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignInComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
