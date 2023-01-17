import { TestBed } from '@angular/core/testing';

import { CodeSyntaxService } from './code-syntax.service';

describe('CodeSyntaxService', () => {
  let service: CodeSyntaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSyntaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
