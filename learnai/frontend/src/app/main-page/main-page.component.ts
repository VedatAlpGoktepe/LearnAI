declare var google: any;

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { GenerationPageComponent } from "../generation-page/generation-page.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LessonItemComponent } from "../lesson-item/lesson-item.component";
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  number: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, GenerationPageComponent, MatSidenavModule, MatButtonModule,
    MatIconModule, MatTooltipModule, HttpClientModule, LessonItemComponent,
    NgFor, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  private router = inject(Router);

  open = false;
  past_lessons: any = null;
  user: any = null;
  
  readonly number = signal('');
  readonly dialog = inject(MatDialog);

  selected_lesson: string = '';

  constructor(private httpClient: HttpClient, private changeDetection: ChangeDetectorRef) {}

  toggleSidenav() {
    this.open = !this.open;
  }

  generateNewLesson() {
    this.selected_lesson = '';
  }

  refreshContent(id: string) {
    if (id === '-1') {
      let token = sessionStorage.getItem('loggedIn');
      let email = JSON.parse(token ? token : '').email;
      this.httpClient.get<any>('http://localhost:3000/api/content/lessons', {headers: {'Accept': 'text/html', 'responseType': 'text', 'email': email}})
      .subscribe((response) => {
        this.past_lessons = response
        this.changeDetection.detectChanges();
      });
    } else {
      this.selected_lesson = id;
      let token = sessionStorage.getItem('loggedIn');
      let email = JSON.parse(token ? token : '').email;
      this.httpClient.get<any>('http://localhost:3000/api/content/lessons', {headers: {'Accept': 'text/html', 'responseType': 'text', 'email': email}})
      .subscribe((response) => {
        this.past_lessons = response;
        this.changeDetection.detectChanges();
      });
    }
  }

  selectLesson(id: string) {
    this.selected_lesson = id;
  }

  logout() {
    sessionStorage.removeItem('loggedIn');
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NumberDialog, {
      data: {number: this.number()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.number.set(result);
        this.httpClient.put<any>('http://localhost:3000/api/account/user/number', {number: this.number(), email: this.user.email})
        .subscribe((response) => {
          this.user = response.user;
        })
      }
    })
  }

  getUserInfo() {
    let token = sessionStorage.getItem('loggedIn');
    let email = JSON.parse(token ? token : '').email;
    this.httpClient.get<any>('http://localhost:3000/api/account/user/', {headers: {'Accept': 'text/html', 'responseType': 'text', 'email': email}})
    .subscribe((response) => {
      this.user = response.user
      if (this.user.number) {
        this.number.set(this.user.number);
      }
    });
  }

  ngOnInit() {
    if(!sessionStorage.getItem('loggedIn')) {
      this.router.navigate(['']);
    }
    this.refreshContent('');
    this.getUserInfo();
  }
}

@Component({
  selector: 'number-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle,
    MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: 'number-dialog.html',
})
export class NumberDialog {
  readonly dialogRef = inject(MatDialogRef<NumberDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly number = model(this.data.number);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
