import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeEditDialogComponent } from './vehicle-type-edit-dialog.component';

describe('VehicleTypeEditDialogComponent', () => {
  let component: VehicleTypeEditDialogComponent;
  let fixture: ComponentFixture<VehicleTypeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
