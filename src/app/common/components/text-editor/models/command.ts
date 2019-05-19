import {EventEmitter} from '@angular/core';
import {CommandTypes} from './command-types';

export interface Command {
  selected: boolean;
  execute: EventEmitter<CommandTypes>;
}
