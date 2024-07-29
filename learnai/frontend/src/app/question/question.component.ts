import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [NgFor, MatButtonModule, NgClass],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input() question: string = '';
  @Input() options: any[] = [];
  selectedId: number = -1;

  selectAnswer(index: any) {
    this.selectedId = index;
  }
}
