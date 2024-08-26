import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTemplateComponent } from './vehicle-template.component';

describe('VehicleTemplateComponent', () => {
  let component: VehicleTemplateComponent;
  let fixture: ComponentFixture<VehicleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
