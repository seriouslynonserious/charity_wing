import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodWingComponent } from './blood-wing.component';

describe('BloodWingComponent', () => {
  let component: BloodWingComponent;
  let fixture: ComponentFixture<BloodWingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloodWingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
