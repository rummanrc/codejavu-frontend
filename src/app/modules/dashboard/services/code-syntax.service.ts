import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodeSyntaxService {
  $codeStr: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor() { }

  getCodeStrObservable(): Observable<string> {
    return this.$codeStr.asObservable();
  }

  setCodeStr(code: string): void {
    this.$codeStr.next(code)
  }
  getCodeStr(): string {
    return this.$codeStr.getValue();
  }

}
