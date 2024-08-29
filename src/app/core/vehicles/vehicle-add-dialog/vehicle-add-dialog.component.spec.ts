import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAddDialogComponent } from './vehicle-add-dialog.component';

describe('VehicleAddDialogComponent', () => {
  let component: VehicleAddDialogComponent;
  let fixture: ComponentFixture<VehicleAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
