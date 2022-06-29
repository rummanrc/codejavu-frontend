import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RestService} from "./services/rest/rest.service";
import {AuthService} from "./services/auth/auth.service";
import {LoginModule} from "./modules/login/login.module";
import {SnippetModule} from "./modules/snippet/snippet.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    SnippetModule
  ],
  providers: [
    AuthService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
