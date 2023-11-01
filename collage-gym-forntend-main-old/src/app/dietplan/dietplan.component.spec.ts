import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanComponent } from './dietplan.component';

describe('DietplanComponent', () => {
  let component: DietplanComponent;
  let fixture: ComponentFixture<DietplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietplanComponent]
    });
    fixture = TestBed.createComponent(DietplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
