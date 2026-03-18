import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface Ingredient {
  id: string;
  nameKey: string;
  icon: string;
  healthy: boolean;
}

@Component({
  selector: 'app-make-drink',
  templateUrl: './make-drink.component.html',
  styleUrls: ['./make-drink.component.css']
})
export class MakeDrinkComponent {
  gameStarted = false;
  selectedIngredients: Ingredient[] = [];
  submitted = false;
  stars = 0;
  message = '';

  ingredients: Ingredient[] = [
    { id: 'water', nameKey: 'game.drink.ing.water', icon: '💧', healthy: true },
    { id: 'lemon', nameKey: 'game.drink.ing.lemon', icon: '🍋', healthy: true },
    { id: 'mint', nameKey: 'game.drink.ing.mint', icon: '🌿', healthy: true },
    { id: 'cucumber', nameKey: 'game.drink.ing.cucumber', icon: '🥒', healthy: true },
    { id: 'sugar', nameKey: 'game.drink.ing.sugar', icon: '🍬', healthy: false },
    { id: 'soda', nameKey: 'game.drink.ing.soda', icon: '🥤', healthy: false },
    { id: 'syrup', nameKey: 'game.drink.ing.syrup', icon: '🍯', healthy: false }
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
    this.selectedIngredients = [];
    this.submitted = false;
    this.message = '';
  }

  toggleIngredient(ing: Ingredient): void {
    if (this.submitted) return;
    const idx = this.selectedIngredients.findIndex(i => i.id === ing.id);
    if (idx >= 0) {
      this.selectedIngredients.splice(idx, 1);
    } else {
      this.selectedIngredients.push(ing);
    }
  }

  isSelected(ing: Ingredient): boolean {
    return this.selectedIngredients.some(i => i.id === ing.id);
  }

  getStars(): string {
    return '⭐'.repeat(this.stars);
  }

  submitDrink(): void {
    this.submitted = true;
    const hasUnhealthy = this.selectedIngredients.some(i => !i.healthy);
    const hasHealthy = this.selectedIngredients.some(i => i.healthy);
    if (hasUnhealthy) {
      this.stars = 0;
      this.message = this.translate('game.drink.warning');
    } else if (hasHealthy) {
      this.stars = 5;
      this.message = this.translate('game.drink.healthy');
    } else {
      this.stars = 0;
      this.message = this.translate('game.drink.empty');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
