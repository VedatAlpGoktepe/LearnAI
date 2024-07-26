import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { GenerationPageComponent } from "./generation-page/generation-page.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LessonItemComponent } from "./lesson-item/lesson-item.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, GenerationPageComponent, MatSidenavModule, MatButtonModule,
    MatIconModule, MatTooltipModule, HttpClientModule, LessonItemComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-local';
  open = false;
  past_lessons: any = null;

  selected_lesson: string = '';

  constructor(private httpClient: HttpClient) {}

  toggleSidenav() {
    this.open = !this.open;
  }

  generateNewLesson() {
    this.selected_lesson = '';
  }

  refreshContent() {
    this.httpClient.get<any>('http://localhost:3000/api/content/lessons', { headers: {'Accept': 'text/html', 'responseType': 'text'}})
    .subscribe((response) => {this.past_lessons = response});
  }

  selectLesson(id: string) {
    this.selected_lesson = id;
  }

  ngOnInit() {
    this.refreshContent();
  }
}
