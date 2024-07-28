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
  chats: [{
    user: string;
    response: {
      readings: any;
      flashcards: any;
      quiz: any;
    }
  }];

  constructor(title: string, input: string, readings: any, flashcards: any, quiz: any) {
    this.title = title;
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
      if (this.firstRequest === true) {
        this.generated = false;
        this.error = false;

        this.httpClient.post<any>('http://localhost:3000/api/content/generate-lesson', { content: this.textPrompt, email: "admin@gmail.com" }, { headers: {'Accept': 'text/html', 'responseType': 'text'}})
        .subscribe((response) => {this.response = response}).add(() => {
          this.generated = true;
          let response_obj = JSON.parse(this.response);
          if (response_obj.error) {
            this.error = true;
            return;
          }
          else {
            this.lesson = new Lesson(response_obj.title, this.textPrompt, response_obj.readings, response_obj.flashcards, response_obj.quiz);
            this.chats = this.lesson.chats;
            this.httpClient.post<any>('http://localhost:3000/api/content/save-lesson', { content: this.lesson})
            .subscribe((response) => {
              if (!response.error) {
                this.id = response.lesson._id;
                this.lesson_saved.emit(this.id);
              }
              else {
                console.log('Error saving lesson');
              }
            });
          }
        });
        this.firstRequest = false;
      }
      else {
        this.generated = false;
        this.error = false;

        this.httpClient.post<any>('http://localhost:3000/api/content/improve-lesson', { content: JSON.stringify(this.lesson.chats), userInput: this.textPrompt, email: "admin@gmail.com" }, { headers: {'Accept': 'text/html', 'responseType': 'text'}})
        .subscribe((response) => {this.response = response}).add(() => {
          this.generated = true;
          let response_obj = JSON.parse(this.response);
          if (response_obj.error) {
            this.error = true;
            console.log('error');
            return;
          }
          else {
            this.lesson.chats.push({
              user: this.textPrompt,
              response: {
                readings: response_obj.readings,
                flashcards: response_obj.flashcards,
                quiz: response_obj.quiz
              }
            });
            this.chats = this.lesson.chats;
            this.httpClient.post<any>('http://localhost:3000/api/content/update-lesson/' + this.id, { content: this.lesson})
            .subscribe((response) => {
              if (!response.error) {
                this.id = response.lesson._id;
                this.lesson_saved.emit(this.id);
              }
              else {
                console.log('Error updating lesson');
              }
            });
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
