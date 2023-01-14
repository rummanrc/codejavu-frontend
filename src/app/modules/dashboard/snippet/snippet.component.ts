import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest/rest.service";
import {RestRoute} from "../../../services/rest/rest-route";
@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  snippets: any;
  private _modalActive: boolean = false;
  private _codeStr: string = "";
  constructor(
    private _rest: RestService,
  ) { }
  get isModalActive(): boolean {
    return this._modalActive;
  }
  get codeStr(): string {
    return this._codeStr;
  }
  showCodeSnippet(): void {
    this._codeStr = "acjbasjhcba"; //TODO: fetch the code snippet and show
    this._modalActive = true;
  }
  closeSnippetModal(): void {
    this._codeStr = "";
    this._modalActive = false;
  }
  ngOnInit() {
    let api = this._rest.url(RestRoute.SNIPPETS);
    this._rest.get(api).subscribe({
      next: value => {
        this.snippets = value;
      },
      error: err => {
        //No-op
      }
    })
  }
}
