import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairToCareComponent } from './hair-to-care.component';

describe('HairToCareComponent', () => {
  let component: HairToCareComponent;
  let fixture: ComponentFixture<HairToCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HairToCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HairToCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
