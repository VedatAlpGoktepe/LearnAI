import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardsComponent } from './flash-cards.component';

describe('FlashCardsComponent', () => {
  let component: FlashCardsComponent;
  let fixture: ComponentFixture<FlashCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
