import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorComponent } from './text-editor.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TextEditorService} from './services/text-editor.service';
import {CommandTypes} from './models/command-types';

describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;
  let textEditorServiceMock: TextEditorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditorComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {provide: TextEditorService, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    textEditorServiceMock = TestBed.get(TextEditorService);
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('registerOnChange should set change fn', () => {
    const someFn = (value: string) => {};
    component.registerOnChange(someFn);

    expect(component.onChange).toBe(someFn);
  });

  it('writeValue should set internal value', () => {
    component.writeValue('some value');

    expect(component.value).toBe('some value');
  });

  it('commandExecute should exec global command', () => {
    document.execCommand = jasmine.createSpy();
    component.commandExecute(CommandTypes.ITALIC);

    expect(document.execCommand).toHaveBeenCalledWith(CommandTypes.ITALIC);
  });

  it('input should call onChange function', () => {
    component.onChange = jasmine.createSpy();

    component.input({target: {innerHTML: 'some html'}});

    expect(component.onChange).toHaveBeenCalledWith('some html');
  });

  it('blur should unselect commands', () => {
    component.selectedCommands = [CommandTypes.ITALIC];

    component.blur();

    expect(component.selectedCommands).toEqual([]);
  });

  describe('click', () => {

    beforeEach(() => {
      window.getSelection = jasmine.createSpy().and.returnValue({focusOffset: 20});
      textEditorServiceMock.getSelectionStyles = jasmine.createSpy().and.returnValue([CommandTypes.ITALIC]);
    });

    it('should set selected commands', () => {
      component.click();

      expect(textEditorServiceMock.getSelectionStyles).toHaveBeenCalledWith({focusOffset: 20});
      expect(component.selectedCommands).toEqual([CommandTypes.ITALIC]);
    });

    it('should focus to textarea', () => {
      spyOn(component.textArea.nativeElement, 'focus');

      component.click();

      expect(component.textArea.nativeElement.focus).toHaveBeenCalled();
    });

    it('should set selected text', (done) => {

      window.getSelection = jasmine.createSpy().and.returnValue({focusOffset: 20, toString: () => 'some text'});

      component.textSelected$.asObservable().subscribe((result) => {
        expect(result).toBe('some text');
        done();
      });

      component.click();
    });
  });

  describe('setSynonym', () => {
    it('should exec global command', () => {
      document.execCommand = jasmine.createSpy();

      component.setSynonym('synonym');

      expect(document.execCommand).toHaveBeenCalledWith('insertText', false, 'synonym');
    });

    it('should clear selected text', (done) => {

      component.textSelected$.asObservable().subscribe((result) => {
        expect(result).toBe('');
        done();
      });

      component.setSynonym('synonym');
    });

  });
});
