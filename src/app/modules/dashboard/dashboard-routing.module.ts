import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SnippetComponent} from "./snippet/snippet.component";
import {AuthGuard} from "../../services/auth/auth.guard";
import {route} from "../../constants";

const routes: Routes = [
  {
    path: route.SNIPPETS,
    component: SnippetComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: route.SNIPPETS}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
