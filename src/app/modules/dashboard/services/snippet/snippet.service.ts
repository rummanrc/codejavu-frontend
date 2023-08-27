import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Snippet} from "../../snippet/snippet.component";

@Injectable({
  providedIn: 'any'
})

export class SnippetService {

  private $_snippets: BehaviorSubject<Snippet[]> = new BehaviorSubject<Snippet[]>([{}] as Snippet[]);

  constructor() {

  }

  getSnippet(): Observable<Snippet[]> {
    return this.$_snippets.asObservable();
  }

  clearSnippet(): void {
    this.$_snippets.next([{}]);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  insertSnippets(snippets: Snippet[]): void {
    //Todo: Log dump the error trace.
    this.$_snippets.next(snippets);
  }

}
