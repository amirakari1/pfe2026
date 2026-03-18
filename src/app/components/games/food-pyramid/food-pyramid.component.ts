import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface FoodItem {
  id: string;
  nameKey: string;
  icon: string;
  level: 'carbs' | 'fruits' | 'sweets';
}

@Component({
  selector: 'app-food-pyramid',
  templateUrl: './food-pyramid.component.html',
  styleUrls: ['./food-pyramid.component.css']
})
export class FoodPyramidComponent {
  gameStarted = false;
  placed: { [key: string]: string } = {};
  feedback = '';
  correctCount = 0;
  totalPlaced = 0;

  foods: FoodItem[] = [
    { id: 'bread', nameKey: 'game.pyramid.food.bread', icon: '🍞', level: 'carbs' },
    { id: 'rice', nameKey: 'game.pyramid.food.rice', icon: '🍚', level: 'carbs' },
    { id: 'apple', nameKey: 'game.pyramid.food.apple', icon: '🍎', level: 'fruits' },
    { id: 'carrot', nameKey: 'game.pyramid.food.carrot', icon: '🥕', level: 'fruits' },
    { id: 'candy', nameKey: 'game.pyramid.food.candy', icon: '🍬', level: 'sweets' },
    { id: 'cake', nameKey: 'game.pyramid.food.cake', icon: '🎂', level: 'sweets' }
  ];

  levels = [
    { id: 'carbs', label: 'game.pyramid.carbs', icon: '🌾' },
    { id: 'fruits', label: 'game.pyramid.fruits', icon: '🥬' },
    { id: 'sweets', label: 'game.pyramid.sweets', icon: '🍰' }
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
    this.placed = {};
    this.feedback = '';
    this.correctCount = 0;
    this.totalPlaced = 0;
  }

  onDrop(event: DragEvent, zoneId: string): void {
    event.preventDefault();
    const foodId = event.dataTransfer?.getData('food') || '';
    if (!foodId) return;
    const food = this.foods.find(f => f.id === foodId);
    const prevZone = this.placed[foodId];
    if (prevZone && food && food.level === prevZone) this.correctCount--;
    this.placed[foodId] = zoneId;
    if (food && food.level === zoneId) {
      this.correctCount++;
      this.feedback = '✅ ' + this.translate('game.pyramid.correct');
    } else {
      this.feedback = '❌ ' + this.translate('game.pyramid.wrong');
    }
    this.totalPlaced = Object.keys(this.placed).length;
  }

  removePlacement(foodId: string): void {
    if (this.placed[foodId]) {
      const food = this.foods.find(f => f.id === foodId);
      if (food && food.level === this.placed[foodId]) this.correctCount--;
      delete this.placed[foodId];
      this.totalPlaced = Object.keys(this.placed).length;
    }
  }

  isPlaced(foodId: string): boolean {
    return !!this.placed[foodId];
  }

  getPlacedInZone(zoneId: string): FoodItem[] {
    return this.foods.filter(f => this.placed[f.id] === zoneId);
  }

  get gameComplete(): boolean {
    return this.foods.length > 0 && this.foods.every(f => this.placed[f.id]);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
