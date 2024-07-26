import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [],
  templateUrl: './lesson-item.component.html',
  styleUrl: './lesson-item.component.scss'
})
export class LessonItemComponent {
  @Input() title: string = '';
  @Input() id: string = '';

  @Output() lesson_selected = new EventEmitter<string>();

  selectLesson() {
    this.lesson_selected.emit(this.id);
  }
}
