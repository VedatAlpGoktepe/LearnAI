import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Add FormsModule and CommonModule to imports
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(): void {
    this.apiService.register(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.errorMessage = 'Registration failed';
      }
    );
  }
}
