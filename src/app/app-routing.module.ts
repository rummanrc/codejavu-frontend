import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouteService} from "./services/route/route.service";
const routes: Routes = [
  // { path: '*', redirectTo: RouteService.SNIPPETS },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
