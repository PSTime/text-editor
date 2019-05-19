import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldCommandComponent } from './bold-command.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommandTypes} from '../../models/command-types';

describe('BoldCommandComponent', () => {
  let component: BoldCommandComponent;
  let fixture: ComponentFixture<BoldCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoldCommandComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoldCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('click should emit correct command type', (done) => {

    component.execute.subscribe((command) => {
      expect(command).toBe(CommandTypes.BOLD);
      done();
    });

    component.click();
  });
});
