import { Component, Input } from '@angular/core';
import { ReadingComponent } from '../reading/reading.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { QuestionComponent } from '../question/question.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReadingComponent, FlashcardComponent, QuestionComponent, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() chat: any;
}
