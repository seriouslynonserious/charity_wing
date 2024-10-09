import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalliativeWingComponent } from './palliative-wing.component';

describe('PalliativeWingComponent', () => {
  let component: PalliativeWingComponent;
  let fixture: ComponentFixture<PalliativeWingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PalliativeWingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalliativeWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
