import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouteService} from "../../services/route/route.service";
import {SnippetComponent} from "./snippet/snippet.component";
import {AuthGuard} from "../../services/auth/auth.guard";

const routes: Routes = [
  {
    path: RouteService.SNIPPETS,
    component: SnippetComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: RouteService.SNIPPETS}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
