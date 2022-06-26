import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouteService} from "../../shared/services/route/route.service";
import {SnippetComponent} from "./snippet/snippet.component";
import {AuthGuard} from "../../shared/services/auth/auth.guard";

const routes: Routes = [
  {
    path: RouteService.SNIPPETS,
    component: SnippetComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule { }
