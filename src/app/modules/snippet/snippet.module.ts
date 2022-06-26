import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetRoutingModule } from './snippet-routing.module';
import {SnippetComponent} from "./snippet/snippet.component";


@NgModule({
  declarations: [
    SnippetComponent
  ],
  imports: [
    CommonModule,
    SnippetRoutingModule
  ]
})
export class SnippetModule { }
