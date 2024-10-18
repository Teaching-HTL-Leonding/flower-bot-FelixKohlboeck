import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-prompt',
  templateUrl: './system-prompt.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./system-prompt.component.css']
})
export class SystemPromptComponent {
  prompt = signal(''); // Signal für den System-Prompt

  constructor() {}

  setPrompt() {
    // Speichern des System-Prompts im lokalen Speicher
    localStorage.setItem('systemPrompt', this.prompt());
  }
}
