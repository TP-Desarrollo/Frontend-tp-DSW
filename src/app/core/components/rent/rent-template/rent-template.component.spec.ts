import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTemplateComponent } from './rent-template.component';

describe('RentTemplateComponent', () => {
  let component: RentTemplateComponent;
  let fixture: ComponentFixture<RentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
