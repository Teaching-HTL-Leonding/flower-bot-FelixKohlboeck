import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule, NgClass, CommonModule],
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent {
  question = signal('');
  chatHistory = signal<Message[]>([]);

  private readonly openAiService = inject(OpenAIService);

  async answerQuestion() {
    const userQuestion = this.question();

    this.chatHistory.update((history) => [
      ...history,
      { role: 'user', content: userQuestion }
    ]);

    const fullChat = this.chatHistory().map(msg => ({ role: msg.role, content: msg.content }));

    // System-Prompt aus dem lokalen Speicher abrufen
    const systemPrompt = localStorage.getItem('systemPrompt') || '';

    // Erstelle eine Nachricht, die alle vorherigen Nachrichten und den System-Prompt zusammenführt
    const promptWithChat = [{ role: 'system', content: systemPrompt }, ...fullChat];

    const response = await this.openAiService.answerQuestion(promptWithChat);
    const botAnswer = response.choices[0].message.content;

    this.chatHistory.update((history) => [
      ...history,
      { role: 'assistant', content: botAnswer }
    ]);

    this.question.set('');
  }

  startOver() {
    this.chatHistory.set([]);
  }
}

