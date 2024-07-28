declare var google: any;

import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { GenerationPageComponent } from "../generation-page/generation-page.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LessonItemComponent } from "../lesson-item/lesson-item.component";
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, GenerationPageComponent, MatSidenavModule, MatButtonModule,
    MatIconModule, MatTooltipModule, HttpClientModule, LessonItemComponent, NgFor],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  private router = inject(Router);

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

  refreshContent(id: string) {
    this.selected_lesson = id;
    this.httpClient.get<any>('http://localhost:3000/api/content/lessons', { headers: {'Accept': 'text/html', 'responseType': 'text'}})
    .subscribe((response) => {this.past_lessons = response});
  }

  selectLesson(id: string) {
    this.selected_lesson = id;
  }

  logout() {
    sessionStorage.removeItem('loggedIn');
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['']);
  }

  ngOnInit() {
    if(!sessionStorage.getItem('loggedIn')) {
      this.router.navigate(['']);
    }
    this.refreshContent('');
  }
}
