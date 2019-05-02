import { TestBed, inject } from '@angular/core/testing';

import { EntryManagementService } from './entry-management.service';

describe('EntryManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryManagementService]
    });
  });

  it('should be created', inject([EntryManagementService], (service: EntryManagementService) => {
    expect(service).toBeTruthy();
  }));
});
