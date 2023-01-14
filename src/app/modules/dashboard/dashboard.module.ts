import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SnippetComponent} from "./snippet/snippet.component";
import { DashboardComponent } from './dashboard.component';
import { SnippetCreateDialogComponent } from './components/snippet-show-dialog/snippet-show-dialog.component';


@NgModule({
  declarations: [
    SnippetComponent,
    DashboardComponent,
    SnippetCreateDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
