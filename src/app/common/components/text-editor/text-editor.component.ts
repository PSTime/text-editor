import {ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostListener, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommandTypes} from './models/command-types';
import {TextEditorService} from './services/text-editor.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true
    }
  ]
})
export class TextEditorComponent implements ControlValueAccessor {

  public value = '';
  public selectedCommands: CommandTypes[] = [];
  public onChange: (value: string) => void;

  public textSelected$: Subject<string> = new Subject();


  @ViewChild('textArea') public textArea: ElementRef;

  constructor(
    private textEditorService: TextEditorService
  ) {}

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // TODO: implement
  public registerOnTouched(fn: any): void {
  }

  // TODO: implement
  public setDisabledState(isDisabled: boolean): void {
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public commandExecute(command: CommandTypes) {
    document.execCommand(command);
  }

  // TODO: investigate issue with InputEvent
  public input(event: any) {
    if (typeof this.onChange === 'function') {
      this.onChange(event.target.innerHTML);
    }
  }

  @HostListener('click')
  public click() {
    const selection: Selection = window.getSelection();

    if (selection.focusOffset === 0) {
      return;
    }

    this.selectedCommands = this.textEditorService.getSelectionStyles(selection);

    this.textArea.nativeElement.focus();

    this.textSelected$.next(selection.toString());
  }

  public blur() {
    this.selectedCommands = [];
  }

  public setSynonym(word: string) {
    this.textSelected$.next('');
    document.execCommand('insertText', false, word);
  }
}
