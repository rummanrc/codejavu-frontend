import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestService } from "./services/rest/rest.service";
import { AuthService } from "./services/auth/auth.service";
import { LoginModule } from "./modules/login/login.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { RouteService } from "./services/route/route.service";

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
    DashboardModule
  ],
  providers: [
    RestService,
    AuthService,
    RouteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestService,
      multi: true },
    {
      provide: RestService,
      useFactory: restServiceFactory,
      deps: [HttpHandler]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function restServiceFactory(httpHandler: HttpHandler): RestService{
  return new RestService(httpHandler);
}
