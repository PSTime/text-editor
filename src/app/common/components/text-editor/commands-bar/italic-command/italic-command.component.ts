import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Command} from '../../models/command';
import {BaseCommandComponent} from '../base-command.component';
import {CommandTypes} from '../../models/command-types';

@Component({
  selector: 'app-italic-command',
  templateUrl: './italic-command.component.html',
  styleUrls: ['./italic-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItalicCommandComponent  extends BaseCommandComponent implements Command {

  public click() {
    this.execute.emit(CommandTypes.ITALIC);
  }

}
