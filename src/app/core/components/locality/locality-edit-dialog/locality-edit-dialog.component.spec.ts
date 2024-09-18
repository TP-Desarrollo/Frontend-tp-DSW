import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityEditDialogComponent } from './locality-edit-dialog.component';

describe('LocalityEditDialogComponent', () => {
  let component: LocalityEditDialogComponent;
  let fixture: ComponentFixture<LocalityEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
