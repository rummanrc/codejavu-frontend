import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {catchError, map, Observable} from "rxjs";
import {restAPI} from "../../../constants";
import {ErrorService} from "../../../services/error/error.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  private _snippets: any;
  private _languages: Language[] = [];
  private _tags: Tag[] = [];
  private _modalActive: boolean = false;
  private _modalCreateEditActive: boolean = false;
  private _snippet: Snippet = {};

  constructor(private _rest: RestService, private _error: ErrorService) {
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

  get snippets(): any {
    return this._snippets;
  }

  get languages(): Language[] {
    return this._languages;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  ngOnInit(): void {
    this.loadLanguageList();
    this.loadTagList();
    this.loadSnippetList();
  }

  showCodeSnippet(snippetId: number): void {
    this.loadSnippet(snippetId).subscribe({
      next: data => {
        this._snippet = data;
      },
      error: err => {
        this._error.insertMessage("Failed to load code snippet", err);
      }
    });
    this._modalActive = true;
  }

  showAddEditCodeSnippet(snippetToEdit?: Snippet): void {
    this.closeSnippetModal();
    if (snippetToEdit !== undefined) {
      this._snippet = snippetToEdit;
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
      map((data) => {
        return {
          id: data.id,
          title: data.title,
          snippet: data.snippet,
          language: data.language,
          urls: data.urls,
          tags: data.tags
        } as Snippet;
      }),
      catchError((err) => {
        throw  err;
      })
    );
  }

  private loadLanguageList(): void {
    const api = this._rest.url(restAPI.LANGUAGES);
    this._rest.get<any>(api).pipe(
      map((data) => {
        return data as Language[];
      }),
      catchError((err) => {
        throw err;
      })
    ).subscribe({
      next: (languageData) => {
        this._languages = languageData;
      },
      error: (err) => {
        this._error.insertMessage("Language list load error.", err);
      }
    });
  }

  private loadTagList(): void {
    const api = this._rest.url(restAPI.TAGS);
    this._rest.get<any>(api).pipe(
      map((data) => {
        return data as Tag[];
      }),
      catchError((err) => {
        throw err;
      })
    ).subscribe({
      next: (tagData) => {
        this._tags = tagData;
      },
      error: (err) => {
        this._error.insertMessage("Tag list load error.", err);
      }
    });
  }

  private loadSnippetList(): void {
    let api = this._rest.url(restAPI.SNIPPETS);
    this._rest.get(api).subscribe({
      next: value => {
        this._snippets = value;
      },
      error: err => {
        this._error.insertMessage("Snippet list load error.", err);
      }
    });
  }
}

export interface Snippet {
  id?: number,
  title?: string,
  snippet?: string,
  language?: string,
  urls?: string[],
  tags?: Tag[]
}

export interface Language {
  id: number,
  name: string
}

export interface Tag {
  id: number,
  name: string
}

