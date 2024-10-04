import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailWindowComponent } from './vehicle-detail-window.component';

describe('VehicleDetailWindowComponent', () => {
  let component: VehicleDetailWindowComponent;
  let fixture: ComponentFixture<VehicleDetailWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
