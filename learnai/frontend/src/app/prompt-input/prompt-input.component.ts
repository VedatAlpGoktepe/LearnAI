import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Add FormsModule and CommonModule to imports
})
export class PromptInputComponent {
  prompt: string = '';
  generatedContent: string | null = null;

  constructor(private apiService: ApiService) { }

  onSubmit(): void {
    this.apiService.generateContent(this.prompt).subscribe(
      (content: string) => {
        this.generatedContent = content;
      },
      (error: any) => {
        console.error('Error generating content', error);
      }
    );
  }
}
