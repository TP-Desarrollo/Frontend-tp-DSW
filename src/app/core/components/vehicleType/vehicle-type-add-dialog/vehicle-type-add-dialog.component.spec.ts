import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeAddDialogComponent } from './vehicle-type-add-dialog.component';

describe('VehicleTypeAddDialogComponent', () => {
  let component: VehicleTypeAddDialogComponent;
  let fixture: ComponentFixture<VehicleTypeAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
