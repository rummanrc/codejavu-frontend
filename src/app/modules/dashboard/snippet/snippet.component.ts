import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {BehaviorSubject, catchError, debounceTime, map, Observable} from "rxjs";
import {restAPI, route} from "../../../constants";
import {ErrorService} from "../../../services/error/error.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SnippetService} from "../services/snippet/snippet.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
  providers: [SnippetService]
})
export class SnippetComponent implements OnInit {
  private _snippets: any;
  private _languages: Language[] = [];
  private _tags: Tag[] = [];
  private _modalActive: boolean = false;
  private _modalCreateEditActive: boolean = false;
  private _snippet: Snippet = {};
  private _searchResult: SearchResult[] = [];
  private _showSearchMenu: boolean = false;
  private _showSearchResultHeader: boolean = false;
  private _snippetsSearchResult: Snippet[] = [];
  private $_searchQueryStr: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _searchResultCount: number = 0;

  constructor(private _rest: RestService, private _error: ErrorService,
              private _route: ActivatedRoute, private _router: Router,
              private _snippetService: SnippetService) {
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

  get searchResult(): SearchResult[] {
    return this._searchResult;
  }

  get searchResultFirstThree(): SearchResult[] {
    return this._searchResult.slice(0, 3);
  }

  get showSearchMenu(): boolean {
    return this._showSearchMenu;
  }

  get showSearchResultHeader(): boolean {
    return this._showSearchResultHeader;
  }

  get searchResultCount(): number {
    return this._searchResultCount;
  }

  ngOnInit(): void {
    this.$_searchQueryStr.pipe(
      debounceTime(500)
    ).subscribe({
      next: (query) => {
        if (query && query.length > 0) {
          this.getSearchSnippetQuery(query);
        }
      }
    });

    this._snippetService.getSnippet().subscribe({
      next: value => {
        this._snippetsSearchResult = value as Snippet[];
      }
    });

    this._route.queryParams
      .subscribe({
          next: (params) => {
            if (params['search']) {
              this._snippets = this._snippetsSearchResult;
              this._showSearchResultHeader = true;
            } else {
              this._showSearchResultHeader = false;
              this.loadSnippetList();
            }
          }
        }
      );
    this.loadLanguageList();
    this.loadTagList();

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

  onSearchChange(event: Event): void {
    this.$_searchQueryStr.next((event.target as HTMLInputElement).value);
  }


  showSearchResult(searchResult: SearchResult[]): void {
    this._showSearchMenu = false;

    const ids = this.getSnippetIds(searchResult);
    let api = this._rest.url(restAPI.SEARCH);
    this._rest.post(api, {ids: ids}).subscribe({
      next: value => {
        const searchRes = value as Snippet[];
        this._searchResultCount = searchRes.length;
        this._snippetService.insertSnippets(searchRes);
        this._router.navigate([route.SNIPPETS],
          {
            queryParams: {search: true},
            queryParamsHandling: 'merge'
          });
      },
      error: err => {
        this._error.insertMessage("Snippet list load error.", err);
      }
    });
  }

  closeSearchMode(): void {
    this._snippetsSearchResult = [];
    this._searchResult = [];
    this._showSearchResultHeader = false;
    this._snippetService.clearSnippet();
    this._router.navigate([route.SNIPPETS]);
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

  private getSearchSnippetQuery(query: string): void {
    const params = new HttpParams()
      .set('query', query)
      .set('limit', 4);
    let api = this._rest.url(restAPI.SEARCH_QUERY + params.toString());

    this._rest.get(api).subscribe({
      next: value => {
        this._searchResult = value as SearchResult[];
        this._showSearchMenu = this._searchResult.length > 3;
      },
      error: err => {
        this._error.insertMessage("Search error.", err);
      }
    });
  }

  private getSnippetIds(searchResult: SearchResult[]): number[] {
    let ids: number[] = [];
    searchResult.forEach(item => {
      ids.push(item.id);
    });
    return ids;
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

export interface SearchResult {
  id: number,
  title: string
}
