import { Injectable } from '@angular/core';
import {AppConfig} from "../../../app-config";
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class RestService extends HttpClient{
  constructor( httpBackend: HttpBackend) {
    super(httpBackend)
    // headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  url(path: string): string {
    return AppConfig.BASE_URL + path
  }
}
