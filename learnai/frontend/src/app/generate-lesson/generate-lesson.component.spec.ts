import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLessonComponent } from './generate-lesson.component';

describe('GenerateLessonComponent', () => {
  let component: GenerateLessonComponent;
  let fixture: ComponentFixture<GenerateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
