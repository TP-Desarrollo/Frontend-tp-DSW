import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityAddDialogComponent } from './locality-add-dialog.component';

describe('LocalityAddDialogComponent', () => {
  let component: LocalityAddDialogComponent;
  let fixture: ComponentFixture<LocalityAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
