import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface Ingredient {
  id: string;
  nameKey: string;
  icon: string;
  type: 'carb' | 'protein' | 'vegetable' | 'unhealthy';
}

@Component({
  selector: 'app-future-chef',
  templateUrl: './future-chef.component.html',
  styleUrls: ['./future-chef.component.css']
})
export class FutureChefComponent {
  gameStarted = false;
  selectedIngredients: Ingredient[] = [];
  cookingMethod = '';
  submitted = false;
  stars = 0;
  message = '';

  ingredients: Ingredient[] = [
    { id: 'rice', nameKey: 'game.chef.ing.rice', icon: '🍚', type: 'carb' },
    { id: 'bread', nameKey: 'game.chef.ing.bread', icon: '🍞', type: 'carb' },
    { id: 'fries', nameKey: 'game.chef.ing.fries', icon: '🍟', type: 'unhealthy' },
    { id: 'chicken', nameKey: 'game.chef.ing.chicken', icon: '🍗', type: 'protein' },
    { id: 'fish', nameKey: 'game.chef.ing.fish', icon: '🐟', type: 'protein' },
    { id: 'broccoli', nameKey: 'game.chef.ing.broccoli', icon: '🥦', type: 'vegetable' },
    { id: 'salad', nameKey: 'game.chef.ing.salad', icon: '🥗', type: 'vegetable' },
    { id: 'soda', nameKey: 'game.chef.ing.soda', icon: '🥤', type: 'unhealthy' },
    { id: 'sauce', nameKey: 'game.chef.ing.sauce', icon: '🍯', type: 'unhealthy' }
  ];

  methods = [
    { id: 'grilled', name: 'game.chef.grilled' },
    { id: 'steamed', name: 'game.chef.steamed' },
    { id: 'fried', name: 'game.chef.fried' }
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
    this.cookingMethod = '';
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

  submitMeal(): void {
    this.submitted = true;
    const hasCarb = this.selectedIngredients.some(i => i.type === 'carb');
    const hasProtein = this.selectedIngredients.some(i => i.type === 'protein');
    const hasVegetable = this.selectedIngredients.some(i => i.type === 'vegetable');
    const hasUnhealthy = this.selectedIngredients.some(i => i.type === 'unhealthy');
    const isFried = this.cookingMethod === 'fried';

    let score = 0;
    if (hasCarb) score += 2;
    if (hasProtein) score += 2;
    if (hasVegetable) score += 2;
    if (isFried) score -= 2;
    if (hasUnhealthy) score -= 2;

    if (score >= 6) {
      this.stars = 5;
      this.message = this.translate('game.chef.perfect');
    } else if (score >= 2) {
      this.stars = 3;
      this.message = this.translate('game.chef.good');
    } else {
      this.stars = 2;
      this.message = this.translate('game.chef.poor');
    }
  }

  getStars(): string {
    return '⭐'.repeat(this.stars);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
