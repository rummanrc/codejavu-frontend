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
  constructor(
    private _rest: RestService,
  ) { }
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
