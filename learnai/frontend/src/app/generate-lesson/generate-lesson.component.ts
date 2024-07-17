import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-lesson',
  standalone: true,
  imports: [NgIf, FormsModule, HttpClientModule],
  templateUrl: './generate-lesson.component.html',
  styleUrl: './generate-lesson.component.scss'
})
export class GenerateLessonComponent {
  subject: string = '';
  response: string | null = null;

  constructor(private httpClient: HttpClient) {}

  makeRequest() {
    if (this.subject.trim() !== '') {
      this.httpClient.post<any>('http://localhost:3000/api/content/generate-lesson', { content: this.subject }, { headers: {'Accept': 'text/html', 'responseType': 'text'}}).subscribe((response) => {this.response = response});
      //http://localhost:3000/api/content/generate-lesson
      // fetch('http://reqres.in/api/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ subject: this.subject })
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     this.response = data.choices[0].message;
      // });
    }
  }
}
