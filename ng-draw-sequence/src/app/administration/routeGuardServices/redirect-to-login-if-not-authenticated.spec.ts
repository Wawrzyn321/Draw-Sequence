import { TestBed, inject } from '@angular/core/testing';
import { RedirectToLoginIfNotAuthenticatedService } from './redirect-to-login-if-not-authenticated';


describe('RouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectToLoginIfNotAuthenticatedService]
    });
  });

  it('should be created', inject([RedirectToLoginIfNotAuthenticatedService], (service: RedirectToLoginIfNotAuthenticatedService) => {
    expect(service).toBeTruthy();
  }));
});
