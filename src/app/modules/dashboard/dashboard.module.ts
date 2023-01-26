import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SnippetComponent} from "./snippet/snippet.component";
import { DashboardComponent } from './dashboard.component';
import { SnippetShowDialogComponent } from './components/snippet-show-dialog/snippet-show-dialog.component';
import { SnippetCreateEditDialogComponent } from './components/snippet-create-edit-dialog/snippet-create-edit-dialog.component';
import { HighlighterComponent } from './components/highlighter/highlighter.component';
import {FormsModule} from "@angular/forms";
import { NgxCodeJarComponent } from './components/editor/NgxCodeJar.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    SnippetComponent,
    DashboardComponent,
    SnippetShowDialogComponent,
    SnippetCreateEditDialogComponent,
    HighlighterComponent,
    NgxCodeJarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ]
})
export class DashboardModule { }
