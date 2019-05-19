import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SynonymsService {

  constructor(private http: HttpClient) { }

  public getSynonyms(text: string): Observable<{word: string}[]> {
    return this.http.get<{word: string}[]>(`https://api.datamuse.com/words?ml=${text}`);
  }
}
