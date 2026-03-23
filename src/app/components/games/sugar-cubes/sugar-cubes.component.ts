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
    this.answered = false;
    this.pickRandomDrink();
  }

  private lastDrinkId: string | null = null;

  pickRandomDrink(): void {
    const available = this.drinks.filter(d => d.id !== this.lastDrinkId);
    const pool = available.length > 0 ? available : this.drinks;
    const random = pool[Math.floor(Math.random() * pool.length)];
    this.currentDrink = { ...random };
    this.lastDrinkId = random.id;
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
    this.alternativeMessage = this.translate(this.currentDrink.altKey);
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

  onImageError(e: Event): void {
    const img = e.target as HTMLImageElement;
    if (img) img.src = 'https://via.placeholder.com/300x300/0D9488/ffffff?text=?';
  }
}
