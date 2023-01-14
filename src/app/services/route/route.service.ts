import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public static readonly SIGNUP: string = 'signup';
  public static readonly LOGIN: string = 'login';
  public static readonly SNIPPETS: string = 'dashboard/snippets';
  constructor() { }
}
