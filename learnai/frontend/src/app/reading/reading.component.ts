import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss'
})
export class ReadingComponent {
  @Input() title: string = '';
  @Input() content: string = '';
}
