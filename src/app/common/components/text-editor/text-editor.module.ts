import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnderlineCommandComponent} from './commands-bar/underline-command/underline-command.component';
import {BoldCommandComponent} from './commands-bar/bold-command/bold-command.component';
import {TextEditorComponent} from './text-editor.component';
import {ItalicCommandComponent} from './commands-bar/italic-command/italic-command.component';
import {CommandsBarComponent} from './commands-bar/commands-bar.component';
import {SynonymsService} from './services/synonyms.service';
import { SynonymsBarComponent } from './synonyms-bar/synonyms-bar.component';

@NgModule({
  declarations: [
    TextEditorComponent,
    BoldCommandComponent,
    ItalicCommandComponent,
    UnderlineCommandComponent,
    CommandsBarComponent,
    SynonymsBarComponent
  ],
  exports: [
    TextEditorComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SynonymsService
  ]
})
export class TextEditorModule { }
