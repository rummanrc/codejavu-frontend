import { Injectable } from '@angular/core';
import { AppConfig } from "../../app-config";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RestService implements HttpInterceptor {
  constructor(private http: HttpClient) {
  }

  url(path: string): string {
    return AppConfig.BASE_URL + path;
  }
  getToken(): string|null {
    return localStorage.getItem('token');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken,
        Accept: "application/json" // TODO: It will cause problem  if any external api doesnt accept json
      }
    });
    return next.handle(req);
  }

  post<T>(api: string, body: any|null) {
    return this.http.post<T>(api,body);
  }

  get<T>(api: string) {
    return this.http.get<T>(api);
  }
}
