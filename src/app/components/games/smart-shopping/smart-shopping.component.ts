import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface FoodItem {
  id: string;
  nameKey: string;
  icon: string;
  points: number;
  type: 'vegetable' | 'fruit' | 'protein' | 'carb' | 'sugar' | 'soda';
}

@Component({
  selector: 'app-smart-shopping',
  templateUrl: './smart-shopping.component.html',
  styleUrls: ['./smart-shopping.component.css']
})
export class SmartShoppingComponent {
  gameStarted = false;
  budget = 20;
  cart: FoodItem[] = [];
  submitted = false;
  stars = 0;
  message = '';

  foods: FoodItem[] = [
    { id: 'carrot', nameKey: 'game.shopping.food.carrot', icon: '🥕', points: 3, type: 'vegetable' },
    { id: 'broccoli', nameKey: 'game.shopping.food.broccoli', icon: '🥦', points: 3, type: 'vegetable' },
    { id: 'apple', nameKey: 'game.shopping.food.apple', icon: '🍎', points: 3, type: 'fruit' },
    { id: 'banana', nameKey: 'game.shopping.food.banana', icon: '🍌', points: 3, type: 'fruit' },
    { id: 'chicken', nameKey: 'game.shopping.food.chicken', icon: '🍗', points: 5, type: 'protein' },
    { id: 'fish', nameKey: 'game.shopping.food.fish', icon: '🐟', points: 5, type: 'protein' },
    { id: 'rice', nameKey: 'game.shopping.food.rice', icon: '🍚', points: 4, type: 'carb' },
    { id: 'bread', nameKey: 'game.shopping.food.bread', icon: '🍞', points: 4, type: 'carb' },
    { id: 'candy', nameKey: 'game.shopping.food.candy', icon: '🍬', points: 8, type: 'sugar' },
    { id: 'cake', nameKey: 'game.shopping.food.cake', icon: '🎂', points: 8, type: 'sugar' },
    { id: 'soda', nameKey: 'game.shopping.food.soda', icon: '🥤', points: 7, type: 'soda' }
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
    this.budget = 20;
    this.cart = [];
    this.submitted = false;
    this.message = '';
  }

  addToCart(item: FoodItem): void {
    if (this.submitted) return;
    const total = this.cart.reduce((s, i) => s + i.points, 0);
    if (total + item.points <= this.budget) {
      this.cart.push(item);
    }
  }

  removeFromCart(item: FoodItem): void {
    if (this.submitted) return;
    const idx = this.cart.indexOf(item);
    if (idx >= 0) this.cart.splice(idx, 1);
  }

  get totalPoints(): number {
    return this.cart.reduce((s, i) => s + i.points, 0);
  }

  get remainingPoints(): number {
    return this.budget - this.totalPoints;
  }

  getStars(): string {
    return '⭐'.repeat(this.stars);
  }

  submitMeal(): void {
    this.submitted = true;
    const hasVegetable = this.cart.some(i => i.type === 'vegetable');
    const hasProtein = this.cart.some(i => i.type === 'protein');
    const hasCarb = this.cart.some(i => i.type === 'carb');
    const hasSugar = this.cart.some(i => i.type === 'sugar' || i.type === 'soda');
    const overBudget = this.totalPoints > this.budget;

    if (overBudget) {
      this.stars = 0;
      this.message = this.translate('game.shopping.overBudget');
    } else if (hasSugar) {
      this.stars = 2;
      this.message = this.translate('game.shopping.tooMuchSugar');
    } else if (hasVegetable && hasProtein && hasCarb) {
      this.stars = 5;
      this.message = this.translate('game.shopping.balanced');
    } else {
      this.stars = 3;
      this.message = this.translate('game.shopping.incomplete');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
