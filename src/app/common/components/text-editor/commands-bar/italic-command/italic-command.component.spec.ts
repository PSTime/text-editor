import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalicCommandComponent } from './italic-command.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommandTypes} from '../../models/command-types';

describe('ItalicCommandComponent', () => {
  let component: ItalicCommandComponent;
  let fixture: ComponentFixture<ItalicCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItalicCommandComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItalicCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('click should emit correct command type', (done) => {

    component.execute.subscribe((command) => {
      expect(command).toBe(CommandTypes.ITALIC);
      done();
    });

    component.click();
  });
});
