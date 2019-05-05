import { TestBed, inject } from '@angular/core/testing';

import { PointContainerService } from './point-container.service';

describe('PointContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointContainerService]
    });
  });

  it('should be created', inject([PointContainerService], (service: PointContainerService) => {
    expect(service).toBeTruthy();
  }));
});
