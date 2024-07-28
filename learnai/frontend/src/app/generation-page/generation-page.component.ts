import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { ReadingComponent } from "../reading/reading.component";
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { QuestionComponent } from '../question/question.component';
import { ChatComponent } from "../chat/chat.component";

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
  @Input() id = '';
  textPrompt = '';

  lesson: any = null;
  chats: any = null;
  
  firstRequest = true;
  generated = false;
  error = false;
  
  response: string = '';

  @Output() lesson_saved = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {}

  generate(input: any) {
    if (this.textPrompt.trim() !== '') {
      this.generated = false;
      this.error = false;
      let token = sessionStorage.getItem('loggedIn');
      let email = JSON.parse(token ? token : '').email;

      if (this.firstRequest === true) {

        this.httpClient.post<any>('http://localhost:3000/api/content/generate-lesson', { content: this.textPrompt, email: email })
        .subscribe((response) => {
          this.generated = true;
          if (response.error) {
            this.error = true;
            console.error(response.error);
            return;
          }
          else {
            this.lesson = response.lesson;
            this.chats = this.lesson.chats;
            this.id = response.lesson._id;
            this.lesson_saved.emit(this.id);
            this.firstRequest = false;
          }
        });
      }
      else {
        this.httpClient.post<any>('http://localhost:3000/api/content/improve-lesson/' + this.id, { lesson: this.lesson, userInput: this.textPrompt, email: email })
        .subscribe((response) => {
          this.generated = true;
        
          if (response.error) {
            this.error = true;
            console.log('error');
            return;
          }
          else {
            console.log("error here");
            this.lesson = response.lesson;
            this.chats = this.lesson.chats;
            this.id = response.lesson._id;
            this.lesson_saved.emit(this.id);
          }
        });
      }
    }
    input.value = '';
  }

  ngOnChanges() {
    if (this.id !== '') {
      this.httpClient.get<any>('http://localhost:3000/api/content/lessons/' + this.id, { headers: {'Accept': 'text/html', 'responseType': 'text'}})
      .subscribe((response) => {
        this.firstRequest = false;
        this.generated = true;
        this.lesson = response;
        this.chats = this.lesson.chats;
      });
    }
    else {
      this.firstRequest = true;
      this.generated = false;
      this.error = false;
      this.response = '';
      this.lesson = null;
    }
  }
}
