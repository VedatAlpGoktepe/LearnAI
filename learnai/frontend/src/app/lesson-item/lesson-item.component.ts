import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './lesson-item.component.html',
  styleUrl: './lesson-item.component.scss'
})
export class LessonItemComponent {
  @Input() title: string = '';
  @Input() id: string = '';

  @Output() lesson_selected = new EventEmitter<string>();
  @Output() lesson_deleted = new EventEmitter<string>();

  selectLesson() {
    this.lesson_selected.emit(this.id);
  }

  deleteLesson() {
    this.lesson_deleted.emit(this.id);
  }
}
