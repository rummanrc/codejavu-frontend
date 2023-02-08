import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RestService} from "./services/rest/rest.service";
import {AuthService} from "./services/auth/auth.service";
import {LoginModule} from "./modules/login/login.module";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {AuthGuard} from "./services/auth/auth.guard";
import {ErrorService} from "./services/error/error.service";
import {SnackbarComponent} from './components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    DashboardModule
  ],
  providers: [
    RestService,
    AuthService,
    ErrorService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestService,
      multi: true
    },
    {
      provide: RestService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
