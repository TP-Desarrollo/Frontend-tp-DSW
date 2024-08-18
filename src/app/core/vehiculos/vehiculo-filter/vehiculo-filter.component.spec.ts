import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoFilterComponent } from './vehiculo-filter.component';

describe('VehiculoFilterComponent', () => {
  let component: VehiculoFilterComponent;
  let fixture: ComponentFixture<VehiculoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
