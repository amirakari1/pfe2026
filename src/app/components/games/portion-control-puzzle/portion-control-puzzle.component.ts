import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface MemoryCard {
  id: number;
  food: string;
  portion: string;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-portion-control-puzzle',
  templateUrl: './portion-control-puzzle.component.html',
  styleUrls: ['./portion-control-puzzle.component.css'],
  animations: [
    trigger('flipAnimation', [
      transition(':enter', [
        style({ transform: 'rotateY(0deg)' }),
        animate('300ms ease-in-out', style({ transform: 'rotateY(180deg)' }))
      ])
    ])
  ]
})
export class PortionControlPuzzleComponent {
  score = 0;
  gameStarted = false;
  flippedCards: MemoryCard[] = [];
  moves = 0;
  pairsFound = 0;
  totalPairs = 6;

  cards: MemoryCard[] = [
    { id: 1, food: 'Apple', portion: '1 medium', icon: '🍎', flipped: false, matched: false },
    { id: 2, food: 'Apple', portion: '1 medium', icon: '🍎', flipped: false, matched: false },
    { id: 3, food: 'Rice', portion: '1 cup', icon: '🍚', flipped: false, matched: false },
    { id: 4, food: 'Rice', portion: '1 cup', icon: '🍚', flipped: false, matched: false },
    { id: 5, food: 'Chicken', portion: '3 oz', icon: '🍗', flipped: false, matched: false },
    { id: 6, food: 'Chicken', portion: '3 oz', icon: '🍗', flipped: false, matched: false },
    { id: 7, food: 'Bread', portion: '1 slice', icon: '🍞', flipped: false, matched: false },
    { id: 8, food: 'Bread', portion: '1 slice', icon: '🍞', flipped: false, matched: false },
    { id: 9, food: 'Milk', portion: '1 cup', icon: '🥛', flipped: false, matched: false },
    { id: 10, food: 'Milk', portion: '1 cup', icon: '🥛', flipped: false, matched: false },
    { id: 11, food: 'Cheese', portion: '1 oz', icon: '🧀', flipped: false, matched: false },
    { id: 12, food: 'Cheese', portion: '1 oz', icon: '🧀', flipped: false, matched: false }
  ];

  shuffledCards: MemoryCard[] = [];

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.score = 0;
    this.moves = 0;
    this.pairsFound = 0;
    this.flippedCards = [];
    this.shuffleCards();
  }

  shuffleCards(): void {
    this.shuffledCards = [...this.cards].sort(() => Math.random() - 0.5);
    this.shuffledCards.forEach(card => {
      card.flipped = false;
      card.matched = false;
    });
  }

  flipCard(card: MemoryCard): void {
    if (card.flipped || card.matched || this.flippedCards.length >= 2) return;

    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }

  checkMatch(): void {
    const [card1, card2] = this.flippedCards;
    
    if (card1.food === card2.food && card1.id !== card2.id) {
      card1.matched = true;
      card2.matched = true;
      this.pairsFound++;
      this.score += 50;
      
      if (this.pairsFound >= this.totalPairs) {
        setTimeout(() => {
          alert(`${this.translate('game.memory.perfect')} ${this.translate('game.finalScore')}: ${this.score}`);
          this.gameStarted = false;
        }, 500);
      }
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }
    
    this.flippedCards = [];
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
