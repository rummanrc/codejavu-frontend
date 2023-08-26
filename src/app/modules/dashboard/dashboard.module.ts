import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SnippetComponent} from "./snippet/snippet.component";
import {DashboardComponent} from './dashboard.component';
import {SnippetShowDialogComponent} from './components/snippet-show-dialog/snippet-show-dialog.component';
import {
  SnippetCreateEditDialogComponent
} from './components/snippet-create-edit-dialog/snippet-create-edit-dialog.component';
import {FormsModule} from "@angular/forms";
import {NgxCodeJarComponent} from './components/editor/NgxCodeJar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SyntaxHighlightDirective} from './directives/SyntaxHighlight/syntax-highlight.directive';


@NgModule({
  declarations: [
    SnippetComponent,
    DashboardComponent,
    SnippetShowDialogComponent,
    SnippetCreateEditDialogComponent,
    NgxCodeJarComponent,
    NavbarComponent,
    SyntaxHighlightDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
