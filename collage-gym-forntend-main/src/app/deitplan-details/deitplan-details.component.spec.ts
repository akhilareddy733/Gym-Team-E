import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeitplanDetailsComponent } from './deitplan-details.component';

describe('DeitplanDetailsComponent', () => {
  let component: DeitplanDetailsComponent;
  let fixture: ComponentFixture<DeitplanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeitplanDetailsComponent]
    });
    fixture = TestBed.createComponent(DeitplanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
