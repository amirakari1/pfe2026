import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { DRINKS_DATASET, DrinkEntry } from '../../../data/drinks.dataset';

@Component({
  selector: 'app-sugar-cubes',
  templateUrl: './sugar-cubes.component.html',
  styleUrls: ['./sugar-cubes.component.css']
})
export class SugarCubesComponent {
  gameStarted = false;
  sessionComplete = false;
  currentIndex = 0;
  answered = false;
  currentDrink: DrinkEntry | null = null;
  userAnswer = 0;
  stars = 0;
  message = '';
  alternativeMessage = '';

  readonly drinks = DRINKS_DATASET;
  readonly maxCubes = 15;

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.sessionComplete = false;
    this.currentIndex = 0;
    this.answered = false;
    this.loadCurrentDrink();
  }

  private loadCurrentDrink(): void {
    const d = this.drinks[this.currentIndex];
    this.currentDrink = d ? { ...d } : null;
    this.userAnswer = 0;
    this.message = '';
    this.alternativeMessage = '';
    this.stars = 0;
  }

  get isLastRound(): boolean {
    return this.drinks.length > 0 && this.currentIndex >= this.drinks.length - 1;
  }

  get progressLabel(): string {
    const n = this.drinks.length;
    if (n === 0) return '';
    return `${this.translate('game.sugar.progress')} ${this.currentIndex + 1} / ${n}`;
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
    this.alternativeMessage = this.translate(this.currentDrink.altKey);
  }

  nextDrink(): void {
    if (this.isLastRound) {
      this.sessionComplete = true;
      this.answered = false;
      this.currentDrink = null;
      return;
    }
    this.currentIndex++;
    this.answered = false;
    this.loadCurrentDrink();
  }

  playAgain(): void {
    this.startGame();
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

  onImageError(e: Event): void {
    const img = e.target as HTMLImageElement;
    if (img) img.src = 'https://via.placeholder.com/300x300/0D9488/ffffff?text=?';
  }
}
