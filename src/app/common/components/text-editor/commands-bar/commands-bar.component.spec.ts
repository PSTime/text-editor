import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsBarComponent } from './commands-bar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommandTypes} from '../models/command-types';

describe('CommandsBarComponent', () => {
  let component: CommandsBarComponent;
  let fixture: ComponentFixture<CommandsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsBarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('commandExecute should emit correct command type', (done) => {
    component.execute.subscribe((command) => {
      expect(command).toBe(CommandTypes.BOLD);
      done();
    });

    component.commandExecute(CommandTypes.BOLD);
  });

  it('isCommandSelected should return true for selected', () => {
    component.selectedCommands = [CommandTypes.BOLD];

    expect(component.isCommandSelected(CommandTypes.BOLD)).toBe(true);
  });


  it('isCommandSelected should return false for unselected', () => {
    component.selectedCommands = [CommandTypes.BOLD];

    expect(component.isCommandSelected(CommandTypes.ITALIC)).toBe(false);
  });
});
