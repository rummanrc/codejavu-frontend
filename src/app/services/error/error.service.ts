import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private $_message: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {

  }

  getMessage(): Observable<string> {
    return this.$_message.asObservable();
  }

  clearMessage(): void {
    this.$_message.next('');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  insertMessage(msg: string, error?: any): void {
    //Todo: Log dump the error trace.
    this.$_message.next(msg);
  }

}
