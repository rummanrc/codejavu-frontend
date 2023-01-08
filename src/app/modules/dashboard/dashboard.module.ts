import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SnippetComponent} from "./snippet/snippet.component";
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    SnippetComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
