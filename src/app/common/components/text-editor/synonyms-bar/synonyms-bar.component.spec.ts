import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsBarComponent } from './synonyms-bar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SynonymsService} from '../services/synonyms.service';
import {of} from 'rxjs';

describe('SynonymsBarComponent', () => {
  let component: SynonymsBarComponent;
  let fixture: ComponentFixture<SynonymsBarComponent>;
  let synonymsServiceMock: SynonymsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymsBarComponent ],
      providers: [
        {provide: SynonymsService, useValue: {}}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    synonymsServiceMock = TestBed.get(SynonymsService);
  });

  it('should return list of synonyms for word', (done) => {
    synonymsServiceMock.getSynonyms = jasmine.createSpy().and.returnValue(of([{word: 'word1'}, {word: 'word2'}]));

    component.ngOnInit();

    component.synonymsSuggestions$.subscribe((result) => {
      expect(result).toEqual(['word1', 'word2']);
      done();
    });

    component.selectedText = 'word';
  });

  it('should return empty array for empty string', (done) => {
    synonymsServiceMock.getSynonyms = jasmine.createSpy().and.returnValue(of([{word: 'word1'}, {word: 'word2'}]));

    component.ngOnInit();

    component.synonymsSuggestions$.subscribe((result) => {
      expect(synonymsServiceMock.getSynonyms).not.toHaveBeenCalled();
      expect(result).toEqual([]);
      done();
    });

    component.selectedText = '';
  });
});
