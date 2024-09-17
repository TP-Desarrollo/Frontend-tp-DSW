import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeTemplateComponent } from './vehicle-type-template.component';

describe('VehicleTypeTemplateComponent', () => {
  let component: VehicleTypeTemplateComponent;
  let fixture: ComponentFixture<VehicleTypeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
