import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextEditorModule} from './text-editor/text-editor.module';

@NgModule({
  imports: [
    CommonModule,
    TextEditorModule
  ],
  exports: [
    TextEditorModule
  ]
})
export class CommonComponentsModule { }
