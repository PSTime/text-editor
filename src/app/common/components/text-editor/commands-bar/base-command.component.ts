import {EventEmitter, Input, Output} from '@angular/core';
import {CommandTypes} from '../models/command-types';

export abstract class BaseCommandComponent {

  @Input() public selected = false;
  @Output() public execute: EventEmitter<CommandTypes> = new EventEmitter();

  public abstract click(): void;
}
