import { Injectable } from '@angular/core';
import {AppConfig} from "../../app-config";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
@Injectable({
  providedIn: 'root'
})
export class RestService extends HttpClient {
  constructor(httpHandler: HttpHandler) {
    super(httpHandler);
  }
  url(path: string): string {
    return AppConfig.BASE_URL + path
  }
}
