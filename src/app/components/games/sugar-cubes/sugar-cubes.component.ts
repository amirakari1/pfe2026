import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface Drink {
  id: string;
  nameKey: string;
  icon: string;
  cubes: number;
}

@Component({
  selector: 'app-sugar-cubes',
  templateUrl: './sugar-cubes.component.html',
  styleUrls: ['./sugar-cubes.component.css']
})
export class SugarCubesComponent {
  gameStarted = false;
  answered = false;
  currentDrink: Drink | null = null;
  userAnswer = 0;
  stars = 0;
  message = '';
  alternativeMessage = '';

  drinks: Drink[] = [
    { id: 'cola', nameKey: 'game.sugar.drink.cola', icon: '🥤', cubes: 8 },
    { id: 'juice', nameKey: 'game.sugar.drink.juice', icon: '🧃', cubes: 6 },
    { id: 'energy', nameKey: 'game.sugar.drink.energy', icon: '⚡', cubes: 10 },
    { id: 'smoothie', nameKey: 'game.sugar.drink.smoothie', icon: '🥤', cubes: 7 },
    { id: 'soda', nameKey: 'game.sugar.drink.soda', icon: '🍋', cubes: 9 }
  ];

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.answered = false;
    this.pickRandomDrink();
  }

  pickRandomDrink(): void {
    const random = this.drinks[Math.floor(Math.random() * this.drinks.length)];
    this.currentDrink = { ...random };
    this.userAnswer = 0;
    this.message = '';
    this.alternativeMessage = '';
  }

  submitAnswer(): void {
    if (!this.currentDrink) return;
    this.answered = true;
    const diff = Math.abs(this.userAnswer - this.currentDrink.cubes);
    if (diff <= 1) {
      this.stars = 5;
      this.message = this.translate('game.sugar.excellent');
    } else if (diff <= 3) {
      this.stars = 3;
      this.message = this.translate('game.sugar.close');
    } else {
      this.stars = 0;
      this.message = this.translate('game.sugar.tooFar');
    }
    this.alternativeMessage = this.translate('game.sugar.alternative');
  }

  nextDrink(): void {
    this.answered = false;
    this.pickRandomDrink();
  }

  getStars(): string {
    return '⭐'.repeat(this.stars);
  }

  getCubesArray(): number[] {
    return this.currentDrink ? Array(this.currentDrink.cubes).fill(0) : [];
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
