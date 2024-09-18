import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugWingComponent } from './drug-wing.component';

describe('DrugWingComponent', () => {
  let component: DrugWingComponent;
  let fixture: ComponentFixture<DrugWingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrugWingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
