import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountingListComponent } from './counting-list.component';

describe('CountingListComponent', () => {
  let component: CountingListComponent;
  let fixture: ComponentFixture<CountingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
