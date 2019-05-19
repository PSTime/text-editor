import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Observable, of, Subject} from 'rxjs';
import {concatMap, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {SynonymsService} from '../services/synonyms.service';

@Component({
  selector: 'app-synonyms-bar',
  templateUrl: './synonyms-bar.component.html',
  styleUrls: ['./synonyms-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SynonymsBarComponent implements OnInit {

  @Input()
  public set selectedText(text: string) {
    this.selectedText$.next(text);
  }

  @Output() public synonymSelected: EventEmitter<string> = new EventEmitter<string>();

  public synonymsSuggestions$: Observable<string[]>;
  public selectedText$: Subject<string> = new Subject();

  constructor(
    private synonymsService: SynonymsService
  ) {
  }

  public ngOnInit() {
    this.setSynonymSubscription();
  }

  public selectSynonym(synonym: string) {
    this.synonymSelected.emit(synonym);
  }

  private setSynonymSubscription() {
    this.synonymsSuggestions$ = this.selectedText$.asObservable().pipe(
      debounceTime(500),
      tap(console.log),
      distinctUntilChanged(),
      tap(console.log),
      switchMap((word: string) => iif(
        () => (word.length > 0 && word.length < 50),
        of(word).pipe(
          tap(() => console.log('service')),
          concatMap((text) => this.synonymsService.getSynonyms(text)),
          map((words) => words.map((oneWord) => oneWord.word))
        ),
        of([]).pipe(
          tap(() => console.log('of'))
        )
      ))
    );
  }

}
