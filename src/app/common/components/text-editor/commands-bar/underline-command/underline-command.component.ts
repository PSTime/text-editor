import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Command} from '../../models/command';
import {BaseCommandComponent} from '../base-command.component';
import {CommandTypes} from '../../models/command-types';

@Component({
  selector: 'app-underline-command',
  templateUrl: './underline-command.component.html',
  styleUrls: ['./underline-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnderlineCommandComponent extends BaseCommandComponent implements Command {

  public click() {
    this.execute.emit(CommandTypes.UNDERLINE);
  }

}
