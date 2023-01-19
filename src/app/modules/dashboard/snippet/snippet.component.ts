import { Component, OnInit } from '@angular/core';
import { RestService } from "../../../services/rest/rest.service";
import { catchError, map, Observable } from "rxjs";
import {restAPI} from "../../../constants";
@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  snippets: any;
  private _languages: Language[] = []
  private _tags: Tag[] = []
  private _modalActive: boolean = false;
  private _modalCreateEditActive: boolean = false;
  private _snippet: Snippet = {};
  constructor(private _rest: RestService){
    this.loadLanguageList().subscribe({
      next: (languageData) => {
        this._languages = languageData;
      },
      error: (err) => {
        //No-op
      }
    });
    this.loadTagList().subscribe({
      next: (tagData) => {
        this._tags = tagData;
      },
      error: (err) => {
        //No-op
      }
    });
  }

  get isModalActive(): boolean {
    return this._modalActive;
  }
  get isModalCreateEditActive(): boolean {
    return this._modalCreateEditActive;
  }
  get snippet(): Snippet {
    return this._snippet;
  }
  get languages(): Language[] {
    return this._languages;
  }
  get tags(): Tag[] {
    return this._tags;
  }

  ngOnInit(): void {
    let api = this._rest.url(restAPI.SNIPPETS);
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
    } else {
      this._snippet = {
        title: "Untitled",
        snippet: ``,
        tags: [],
        urls: [],
        language: ""
      };
    }
    this._modalCreateEditActive = true;
  }
  closeSnippetModal(): void {
    this._snippet = {};
    this._modalActive = false;
  }
  closeSnippetCreateEditModal(): void {
    this._modalCreateEditActive = false;
    this._snippet = {};
  }
  private loadSnippet(id: number): Observable<Snippet> {
    const api = this._rest.url(`${restAPI.SNIPPETS}/${id}`);
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
  private loadLanguageList(): Observable<Language[]> {
    const api = this._rest.url(restAPI.LANGUAGES);
    return this._rest.get<any>(api).pipe(
      map( (data) => {
        return data as Language[];
      }),
      catchError((err) => {
        throw err;
      })
    );
  }
  private loadTagList(): Observable<Tag[]> {
    const api = this._rest.url(restAPI.TAGS);
    return this._rest.get<any>(api).pipe(
      map( (data) => {
        return data as Tag[];
      }),
      catchError((err) => {
        throw err;
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

export interface Language {
  id: number,
  name: string
}
export interface Tag {
  id: number,
  name: string
}

