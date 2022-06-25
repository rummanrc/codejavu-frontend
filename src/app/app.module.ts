import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RestService} from "./shared/services/rest/rest.service";
import {AuthService} from "./shared/services/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SnippetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
