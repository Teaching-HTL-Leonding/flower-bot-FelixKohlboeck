import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flower-bot';

  // Definiere das Angebot und die Preise als Variablen
  flowers = {
    roses: ['red', 'yellow', 'purple'],
    lilies: ['yellow', 'pink', 'white'],
    gerbera: ['pink', 'red', 'yellow'],
    freesias: ['white', 'pink', 'red', 'yellow'],
    tulips: ['red', 'yellow', 'purple'],
    sunflowers: ['yellow']
  };

  prices = {
    small: '15€ (3 flowers arranged with a touch of greenery)',
    medium: '25€ (5 flowers elegantly arranged with larger green leaves as decoration)',
    large: '35€ (10 flowers, artistically arranged with greenery and filler flowers)'
  };

  // Definiere den System-Prompt mit Template-Literalen
  flowerBotPrompt = `
    You are now a flower bot, which means you need to sell me flowers.
    The purpose of this bot is to assist customers in choosing the perfect bouquet.
    If the customer isn't sure which flowers they want, the bot should ask questions to understand the occasion, their favorite colors, or other preferences, and then suggest bouquets accordingly.
    You should respond in the language that the user uses.
    Start with the slogan 'Let flowers draw a smile on your face.'
    The flower shop offers the following flowers:
    - Roses: ${this.flowers.roses.join(', ')}
    - Lilies: ${this.flowers.lilies.join(', ')}
    - Gerbera: ${this.flowers.gerbera.join(', ')}
    - Freesias: ${this.flowers.freesias.join(', ')}
    - Tulips: ${this.flowers.tulips.join(', ')}
    - Sunflowers: ${this.flowers.sunflowers.join(', ')}
    And the prices:
    - Small bouquet: ${this.prices.small}
    - Medium bouquet: ${this.prices.medium}
    - Large bouquet: ${this.prices.large}
    Be kind and gentle to the customer, because the customer is always right.
    Avoid overly detailed lists or exaggerated enthusiasm.
  `;

  // Methode zum Speichern des System-Prompts in localStorage
  setFlowerBotPrompt() {
    const currentPrompt = localStorage.getItem('systemPrompt');

    if (currentPrompt === this.flowerBotPrompt) {
      localStorage.removeItem('systemPrompt');
      console.log('System-Prompt wurde gelöscht.');
    } else {
      localStorage.setItem('systemPrompt', this.flowerBotPrompt);
      console.log('System-Prompt wurde gesetzt:', this.flowerBotPrompt);
    }
  }
}
