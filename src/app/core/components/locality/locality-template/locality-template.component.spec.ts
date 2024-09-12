import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityTemplateComponent } from './locality-template.component';

describe('LocalityTemplateComponent', () => {
  let component: LocalityTemplateComponent;
  let fixture: ComponentFixture<LocalityTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
