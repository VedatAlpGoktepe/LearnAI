import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { ReadingComponent } from "../reading/reading.component";
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { QuestionComponent } from '../question/question.component';
import { ChatComponent } from "../chat/chat.component";
import { environment } from '../../environment/environment';
import { environmentProd } from '../../environment/environment.prod';

export class Lesson {
  title: string;
  email: string;
  chats: [{
    user: string;
    response: {
      readings: any;
      flashcards: any;
      quiz: any;
    }
  }];

  constructor(title: string, email: string, input: string, readings: any, flashcards: any, quiz: any) {
    this.title = title;
    this.email = email;
    this.chats = [{
      user: input,
      response: {
        readings: readings,
        flashcards: flashcards,
        quiz: quiz
      }
    }];
  }

  addChat(input: string, readings: any, flashcards: any, quiz: any) {
    this.chats.push({
      user: input,
      response: {
        readings: readings,
        flashcards: flashcards,
        quiz: quiz
      }
    });
    return this.chats;
  }
}

@Component({
  selector: 'app-generation-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf, NgFor, ReadingComponent, FlashcardComponent, QuestionComponent, ChatComponent],
  templateUrl: './generation-page.component.html',
  styleUrl: './generation-page.component.scss'
})
export class GenerationPageComponent {
  endpoint = environment.production ? environmentProd.apiEndpoint : environment.apiEndpoint;

  @Input() id = '';
  textPrompt = '';

  lesson: any = null;
  chats: any = null;
  
  firstRequest = true;
  generating = false;
  error = false;
  
  response: string = '';

  @Output() lesson_saved = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {}

  generate(input: any) {
    if (this.textPrompt.trim() !== '') {
      this.generating = true;
      this.error = false;
      let token = sessionStorage.getItem('loggedIn');
      let email = JSON.parse(token ? token : '').email;

      if (this.firstRequest === true) {

        this.httpClient.post<any>(this.endpoint + '/api/content/generate-lesson', { content: this.textPrompt, email: email })
        .subscribe((response) => {
          this.generating = false;
          if (response.error) {
            this.error = true;
            console.error(response.error);
            return;
          }
          else {
            if (this.id === '') {
              this.lesson = response.lesson;
              this.chats = this.lesson.chats;
              this.id = response.lesson._id;
              this.lesson_saved.emit(this.id);
              this.firstRequest = false;
            } else {
              this.lesson_saved.emit('-1');
            }
          }
        });
      }
      else {
        this.httpClient.post<any>(this.endpoint + '/api/content/improve-lesson/' + this.id, { lesson: this.lesson, userInput: this.textPrompt, email: email })
        .subscribe((response) => {
          this.generating = false;
        
          if (response.error) {
            this.error = true;
            return;
          }
          else {
            if (this.id === response.lesson._id) {
              this.lesson = response.lesson;
              this.chats = this.lesson.chats;
              this.id = response.lesson._id;
              this.lesson_saved.emit(this.id);
            } else {
              this.lesson_saved.emit('-1');
            }
          }
        });
      }
    }
    input.value = '';
  }

  ngOnChanges() {
    if (this.id !== '') {
      let token = sessionStorage.getItem('loggedIn');
      let email = JSON.parse(token ? token : '').email;
      this.httpClient.get<any>(this.endpoint + '/api/content/lessons/' + this.id, { headers: {'Accept': 'text/html', 'responseType': 'text', 'email': email}})
      .subscribe((response) => {
        this.firstRequest = false;
        this.lesson = response;
        this.chats = this.lesson.chats;
        this.lesson_saved.emit(this.id);
      });
    }
    else {
      this.firstRequest = true;
      this.error = false;
      this.response = '';
      this.lesson = null;
    }
  }
}
