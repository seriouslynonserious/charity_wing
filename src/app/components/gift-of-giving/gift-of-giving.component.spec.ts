import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftOfGivingComponent } from './gift-of-giving.component';

describe('GiftOfGivingComponent', () => {
  let component: GiftOfGivingComponent;
  let fixture: ComponentFixture<GiftOfGivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiftOfGivingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftOfGivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
