import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {CommandTypes} from '../models/command-types';

@Component({
  selector: 'app-commands-bar',
  templateUrl: './commands-bar.component.html',
  styleUrls: ['./commands-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsBarComponent {

  @Input() public selectedCommands: CommandTypes[] = [];
  @Output() public execute: EventEmitter<CommandTypes> = new EventEmitter<CommandTypes>();

  public commandTypes: typeof CommandTypes = CommandTypes;

  constructor() { }

  public commandExecute(command: CommandTypes): void {
    this.execute.emit(command);
  }

  public isCommandSelected(command: CommandTypes): boolean {
    return this.selectedCommands.indexOf(command) > -1;
  }

}
