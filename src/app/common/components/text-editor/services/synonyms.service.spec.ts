import {SynonymsService} from './synonyms.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('SynonymsService', () => {

  let service: SynonymsService;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    httpClientMock = <HttpClient> {};
    service = new SynonymsService(httpClientMock);
  });

  it('getSynonyms should call http with appropriate params', () => {
    httpClientMock.get = jasmine.createSpy().and.returnValue(of([]));
    service.getSynonyms('get synonym for').subscribe();

    expect(httpClientMock.get).toHaveBeenCalledWith('https://api.datamuse.com/words?ml=get synonym for');
  });
});
