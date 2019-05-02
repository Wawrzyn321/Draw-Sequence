import { TestBed, inject } from '@angular/core/testing';

import { RedirectToManageIfAuthenticatedService } from './redirect-to-manage-if-authenticated.service';

describe('RedirectToManageIfAuthenticatedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectToManageIfAuthenticatedService]
    });
  });

  it('should be created', inject([RedirectToManageIfAuthenticatedService], (service: RedirectToManageIfAuthenticatedService) => {
    expect(service).toBeTruthy();
  }));
});
