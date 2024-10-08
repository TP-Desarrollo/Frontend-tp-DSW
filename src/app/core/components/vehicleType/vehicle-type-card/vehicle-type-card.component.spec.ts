import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCardComponent } from './vehicle-type-card.component';

describe('VehicleTypeCardComponent', () => {
  let component: VehicleTypeCardComponent;
  let fixture: ComponentFixture<VehicleTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
