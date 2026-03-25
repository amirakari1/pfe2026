import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

interface Card {
  id: number;
  emoji: string;
  fact: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-food-memory',
  templateUrl: './food-memory.component.html',
  styleUrls: ['./food-memory.component.css']
})
export class FoodMemoryComponent {
  gameStarted = false;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;

  pairs: { emoji: string; fact: string }[] = [
    { emoji: '🥕', fact: 'game.memory.carrot' },
    { emoji: '🍎', fact: 'game.memory.apple' },
    { emoji: '🥦', fact: 'game.memory.broccoli' },
    { emoji: '🍌', fact: 'game.memory.banana' },
    { emoji: '🥛', fact: 'game.memory.milk' },
    { emoji: '🍞', fact: 'game.memory.bread' }
  ];

  constructor(
    private router: Router,
    public translationService: TranslationService,
    private gameFeedback: GameFeedbackService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.moves = 0;
    this.flippedCards = [];
    const deck: Card[] = [];
    let id = 0;
    this.pairs.forEach((p, i) => {
      deck.push({ id: id++, emoji: p.emoji, fact: p.fact, flipped: false, matched: false });
      deck.push({ id: id++, emoji: p.emoji, fact: p.fact, flipped: false, matched: false });
    });
    this.cards = deck.sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card): void {
    if (card.flipped || card.matched || this.flippedCards.length >= 2) return;
    card.flipped = true;
    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    const [a, b] = this.flippedCards;
    if (a.emoji === b.emoji) {
      a.matched = true;
      b.matched = true;
      this.gameFeedback.celebrate();
    } else {
      this.gameFeedback.fail();
    }
    setTimeout(() => {
      if (!a.matched) a.flipped = false;
      if (!b.matched) b.flipped = false;
      this.flippedCards = [];
    }, 800);
  }

  get allMatched(): boolean {
    return this.cards.length > 0 && this.cards.every(c => c.matched);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
