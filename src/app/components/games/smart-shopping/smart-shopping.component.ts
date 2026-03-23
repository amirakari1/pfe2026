import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

export interface FoodItem {
  id: string;
  nameKey: string;
  icon: string;
  points: number;
  type: 'vegetable' | 'fruit' | 'protein' | 'carb' | 'sugar' | 'soda';
  uid?: string;  // unique id for cart copies
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
  removeZone: FoodItem[] = [];  // dummy list for drop zone
  submitted = false;
  stars = 0;
  message = '';

  connectedFoodLists = ['cart-list'];
  connectedCartLists = ['foods-list', 'remove-zone'];

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

  dropFood(event: CdkDragDrop<FoodItem[]>): void {
    if (this.submitted) return;

    if (event.previousContainer.id === 'foods-list' && event.container.id === 'cart-list') {
      const item = event.previousContainer.data[event.previousIndex];
      if (this.totalPoints + item.points <= this.budget) {
        const copy: FoodItem = { ...item, uid: `${item.id}-${Date.now()}` };
        this.cart.push(copy);
      }
    } else if (event.previousContainer.id === 'cart-list' && event.container.id === 'remove-zone') {
      const item = event.previousContainer.data[event.previousIndex];
      const idx = this.cart.findIndex(c => (c.uid && c.uid === item.uid) || c === item);
      if (idx >= 0) this.cart.splice(idx, 1);
    } else if (event.previousContainer.id === 'cart-list' && event.container.id === 'cart-list') {
      moveItemInArray(this.cart, event.previousIndex, event.currentIndex);
    }
  }

  addToCart(item: FoodItem): void {
    if (this.submitted) return;
    if (this.totalPoints + item.points <= this.budget) {
      const copy: FoodItem = { ...item, uid: `${item.id}-${Date.now()}` };
      this.cart.push(copy);
    }
  }

  removeFromCart(item: FoodItem): void {
    if (this.submitted) return;
    const idx = this.cart.findIndex(c => c.uid === item.uid || c === item);
    if (idx >= 0) this.cart.splice(idx, 1);
  }

  get totalPoints(): number {
    return this.cart.reduce((s, i) => s + i.points, 0);
  }

  get remainingPoints(): number {
    return this.budget - this.totalPoints;
  }

  get budgetPercent(): number {
    return Math.min(100, (this.totalPoints / this.budget) * 100);
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
