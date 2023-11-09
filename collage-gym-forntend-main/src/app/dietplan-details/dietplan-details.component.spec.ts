import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanDetailsComponent } from './dietplan-details.component';

describe('DietplanDetailsComponent', () => {
  let component: DietplanDetailsComponent;
  let fixture: ComponentFixture<DietplanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietplanDetailsComponent]
    });
    fixture = TestBed.createComponent(DietplanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
