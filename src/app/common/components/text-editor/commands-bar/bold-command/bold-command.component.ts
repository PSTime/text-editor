import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Command} from '../../models/command';
import {CommandTypes} from '../../models/command-types';
import {BaseCommandComponent} from '../base-command.component';

@Component({
  selector: 'app-bold-command',
  templateUrl: './bold-command.component.html',
  styleUrls: ['./bold-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoldCommandComponent extends BaseCommandComponent implements Command {

  public click() {
    this.execute.emit(CommandTypes.BOLD);
  }

}
