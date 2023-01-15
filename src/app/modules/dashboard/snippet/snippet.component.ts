import { Component, OnInit } from '@angular/core';
import { RestService } from "../../../services/rest/rest.service";
import { RestAPIs } from "../../../services/rest/restAPIs";
import { catchError, map, Observable } from "rxjs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  snippets: any;
  private _modalActive: boolean = false;
  private _modalCreateEditActive: boolean = false;
  private _snippet: Snippet = {};
  constructor(private _rest: RestService) {}

  get isModalActive(): boolean {
    return this._modalActive;
  }
  get isModalCreateEditActive(): boolean {
    return this._modalCreateEditActive;
  }
  get snippet(): Snippet {
    return this._snippet;
  }

  ngOnInit(): void {
    let api = this._rest.url(RestAPIs.SNIPPETS);
    this._rest.get(api).subscribe({
      next: value => {
        this.snippets = value;
      },
      error: err => {
        //No-op
      }
    });
  }

  showCodeSnippet(snippetId: number): void {
    this.loadSnippet(snippetId).subscribe( {
      next: data => {
        this._snippet = data;
      },
      error: err => {
        //No-op
      }
    });
    this._modalActive = true;
  }
  showAddEditCodeSnippet(snippet?: Snippet): void {
    this.closeSnippetModal();
    if(snippet !== undefined){
      this._snippet = snippet
    }
    this._modalCreateEditActive = true;
  }
  closeSnippetModal(): void {
    this._snippet = {};
    this._modalActive = false;
  }
  closeSnippetCreateEditModal(): void {
    this._modalCreateEditActive = false;
  }
  private loadSnippet(id: number): Observable<Snippet> {
    const api = this._rest.url(`${RestAPIs.SNIPPETS}/${id}`);
    return this._rest.get<any>(api).pipe(
      map( (data) => {
        return { id: data.id,
          title: data.title,
          snippet: data.snippet,
          language: data.language,
          urls: data.urls,
          tags: data.tags
        } as Snippet;
      }),
      catchError( (err) => {
        throw  err;
      })
    );
  }
}
export interface Snippet {
  id?: number,
  title?: string,
  snippet?: string,
  language?: string,
  urls?: string[],
  tags?: string[]
}

