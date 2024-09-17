import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityAddComponent } from './locality-add.component';

describe('LocalityAddComponent', () => {
  let component: LocalityAddComponent;
  let fixture: ComponentFixture<LocalityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
