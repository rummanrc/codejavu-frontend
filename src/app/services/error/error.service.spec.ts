import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Insertion-I', () => {
    beforeEach(() => {
      service.insertMessage('this is test');
    });
    it('should be inserted message', (done: DoneFn) => {
      service.getMessage().subscribe(x => {
        expect(x).toBe('this is test');
        done();
      });
    });
    it('should be cleared message', (done: DoneFn) => {
      service.clearMessage();
      service.getMessage().subscribe(x => {
        expect(x).toBe('');
        done();
      });
    });
  });
  describe('Insertion-II', () => {
    beforeEach(() => {
      service.insertMessage('this is test', new Error());
    });
    it('should be inserted message', (done: DoneFn) => {
      service.getMessage().subscribe(x => {
        expect(x).toBe('this is test');
        done();
      });
    });
    it('should be cleared message', (done: DoneFn) => {
      service.clearMessage();
      service.getMessage().subscribe(x => {
        expect(x).toBe('');
        done();
      });
    });
  });
});
