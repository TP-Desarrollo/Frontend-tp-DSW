import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeAddComponent } from './vehicle-type-add.component';

describe('VehicleTypeAddComponent', () => {
  let component: VehicleTypeAddComponent;
  let fixture: ComponentFixture<VehicleTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
