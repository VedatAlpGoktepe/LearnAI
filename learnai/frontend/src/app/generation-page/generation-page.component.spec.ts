import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationPageComponent } from './generation-page.component';

describe('GenerationPageComponent', () => {
  let component: GenerationPageComponent;
  let fixture: ComponentFixture<GenerationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
