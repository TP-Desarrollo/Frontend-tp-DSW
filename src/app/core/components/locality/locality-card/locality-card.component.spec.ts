import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityCardComponent } from './locality-card.component';

describe('LocalityCardComponent', () => {
  let component: LocalityCardComponent;
  let fixture: ComponentFixture<LocalityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
