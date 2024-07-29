import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent {
  @Input() question: string = '';
  @Input() answer: string = '';

  flipped = false;

  toggleFlip() {
    this.flipped = !this.flipped;
  }
}
