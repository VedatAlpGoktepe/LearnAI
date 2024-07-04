import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PromptInputComponent } from './prompt-input/prompt-input.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'prompt-input', component: PromptInputComponent },
  { path: '', redirectTo: '/prompt-input', pathMatch: 'full' }
];
