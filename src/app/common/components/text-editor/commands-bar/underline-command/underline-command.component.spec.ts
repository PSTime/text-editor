import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlineCommandComponent } from './underline-command.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommandTypes} from '../../models/command-types';

describe('UnderlineCommandComponent', () => {
  let component: UnderlineCommandComponent;
  let fixture: ComponentFixture<UnderlineCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderlineCommandComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderlineCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('click should emit correct command type', (done) => {

    component.execute.subscribe((command) => {
      expect(command).toBe(CommandTypes.UNDERLINE);
      done();
    });

    component.click();
  });
});
