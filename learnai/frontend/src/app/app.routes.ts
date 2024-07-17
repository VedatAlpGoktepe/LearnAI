import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReadingsComponent } from './readings/readings.component';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GenerateLessonComponent } from './generate-lesson/generate-lesson.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'readings', component: ReadingsComponent },
  { path: 'flash-cards', component: FlashCardsComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'generate-lesson', component: GenerateLessonComponent }
];