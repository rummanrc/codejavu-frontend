import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {RestService} from "../../../services/rest/rest.service";
import {RestRoute} from "../../../services/rest/rest-route";
import {map} from "rxjs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css'],
})
export class SnippetComponent implements OnInit {
  snippets: any[] = [];
  constructor(
    private authService: AuthService,
    private _rest: RestService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    let api = _rest.url(RestRoute.SNIPPETS);
      _rest.get(api).pipe(
        map((res) => {
                this.snippets.push(res);
        })
      )
    console.log(this.snippets)
  }
  ngOnInit() {}
}
