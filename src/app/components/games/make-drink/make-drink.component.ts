import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

export interface Ingredient {
  id: string;
  nameKey: string;
  icon: string;
  calories: number;
  sugar: number;
  vitamins: number;
  hydration: number;
  color: string;
}

export interface Base {
  id: string;
  nameKey: string;
  icon: string;
  calories: number;
  sugar: number;
  hydration: number;
  color: string;
}

type Step = 'base' | 'ingredients' | 'blend' | 'result';

@Component({
  selector: 'app-make-drink',
  templateUrl: './make-drink.component.html',
  styleUrls: ['./make-drink.component.css']
})
export class MakeDrinkComponent {
  gameStarted = false;
  currentStep: Step = 'base';
  selectedBase: Base | null = null;
  availableIngredients: Ingredient[] = [];
  blenderIngredients: Ingredient[] = [];
  blending = false;
  blendProgress = 0;
  resultShown = false;

  bases: Base[] = [
    { id: 'water', nameKey: 'game.drink.base.water', icon: '💧', calories: 0, sugar: 0, hydration: 100, color: '#a8e6cf' },
    { id: 'milk', nameKey: 'game.drink.base.milk', icon: '🥛', calories: 42, sugar: 5, hydration: 88, color: '#f5f5dc' }
  ];

  connectedIngredientsLists = ['blender-list'];
  connectedBlenderLists = ['ingredients-list'];

  allIngredients: Ingredient[] = [
    { id: 'lemon', nameKey: 'game.drink.ing.lemon', icon: '🍋', calories: 12, sugar: 1, vitamins: 35, hydration: 10, color: '#fff44f' },
    { id: 'mint', nameKey: 'game.drink.ing.mint', icon: '🌿', calories: 2, sugar: 0, vitamins: 15, hydration: 5, color: '#98d8aa' },
    { id: 'strawberry', nameKey: 'game.drink.ing.strawberry', icon: '🍓', calories: 4, sugar: 1, vitamins: 50, hydration: 8, color: '#ff6b6b' },
    { id: 'cucumber', nameKey: 'game.drink.ing.cucumber', icon: '🥒', calories: 2, sugar: 0, vitamins: 10, hydration: 15, color: '#90be6d' },
    { id: 'orange', nameKey: 'game.drink.ing.orange', icon: '🍊', calories: 18, sugar: 3, vitamins: 70, hydration: 12, color: '#ff9f43' },
    { id: 'sugar', nameKey: 'game.drink.ing.sugar', icon: '🍬', calories: 16, sugar: 4, vitamins: 0, hydration: 0, color: '#ffffff' },
    { id: 'soda', nameKey: 'game.drink.ing.soda', icon: '🥤', calories: 45, sugar: 12, vitamins: 0, hydration: 30, color: '#e0e0e0' },
    { id: 'syrup', nameKey: 'game.drink.ing.syrup', icon: '🍯', calories: 60, sugar: 15, vitamins: 0, hydration: 5, color: '#c9a959' },
    { id: 'ice', nameKey: 'game.drink.ing.ice', icon: '🧊', calories: 0, sugar: 0, vitamins: 0, hydration: 20, color: '#e3f2fd' },
    { id: 'packaged_juice', nameKey: 'game.drink.ing.packaged_juice', icon: '🧃', calories: 90, sugar: 22, vitamins: 10, hydration: 15, color: '#ffa94d' },
    { id: 'chocolate_syrup', nameKey: 'game.drink.ing.chocolate_syrup', icon: '🍫', calories: 80, sugar: 18, vitamins: 0, hydration: 0, color: '#5a3825' },
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
    this.currentStep = 'base';
    this.selectedBase = null;
    this.availableIngredients = [...this.allIngredients];
    this.blenderIngredients = [];
    this.blending = false;
    this.resultShown = false;
  }

  selectBase(base: Base): void {
    this.selectedBase = base;
  }

  nextToIngredients(): void {
    if (this.selectedBase) this.currentStep = 'ingredients';
  }

  dropIngredient(event: CdkDragDrop<Ingredient[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addToBlender(ing: Ingredient): void {
    const idx = this.availableIngredients.findIndex(i => i.id === ing.id);
    if (idx >= 0) {
      this.availableIngredients.splice(idx, 1);
      this.blenderIngredients.push(ing);
    }
  }

  removeFromBlender(ing: Ingredient): void {
    const idx = this.blenderIngredients.findIndex(i => i.id === ing.id);
    if (idx >= 0) {
      this.blenderIngredients.splice(idx, 1);
      this.availableIngredients.push(ing);
    }
  }

  startBlend(): void {
    if (!this.selectedBase || this.blenderIngredients.length === 0) return;
    this.blending = true;
    this.blendProgress = 0;
    const interval = setInterval(() => {
      this.blendProgress += 10;
      if (this.blendProgress >= 100) {
        clearInterval(interval);
        this.blending = false;
        this.currentStep = 'result';
        this.resultShown = true;
        if (this.healthScore >= 55) {
          this.gameFeedback.celebrate();
        } else {
          this.gameFeedback.fail();
        }
      }
    }, 150);
  }

  get drinkColor(): string {
    if (!this.selectedBase || this.blenderIngredients.length === 0) return this.selectedBase?.color || '#a8e6cf';
    const colors = [this.selectedBase.color, ...this.blenderIngredients.map(i => i.color)].filter(Boolean);
    if (colors.length === 1) return colors[0];
    return this.mixColors(colors);
  }

  private mixColors(hexColors: string[]): string {
    let r = 0, g = 0, b = 0;
    hexColors.forEach(hex => {
      const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      if (m) {
        r += parseInt(m[1], 16);
        g += parseInt(m[2], 16);
        b += parseInt(m[3], 16);
      }
    });
    const n = hexColors.length;
    return `rgb(${Math.round(r/n)}, ${Math.round(g/n)}, ${Math.round(b/n)})`;
  }

  get nutrition(): { calories: number; sugar: number; vitamins: number; hydration: number } {
    let calories = this.selectedBase?.calories ?? 0;
    let sugar = this.selectedBase?.sugar ?? 0;
    let vitamins = 0;
    let hydration = this.selectedBase?.hydration ?? 0;
    this.blenderIngredients.forEach(i => {
      calories += i.calories;
      sugar += i.sugar;
      vitamins += i.vitamins;
      hydration += i.hydration;
    });
    return { calories, sugar, vitamins, hydration: Math.min(100, hydration) };
  }

  get healthScore(): number {
    const { sugar, vitamins, hydration } = this.nutrition;
    let score = 100;
    score -= sugar * 3;
    score += vitamins * 0.15;
    score += hydration * 0.05;
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  get recommendation(): string {
    const { sugar, vitamins, hydration } = this.nutrition;
    const key = sugar > 20 ? 'game.drink.result.sugary' :
      sugar > 10 ? 'game.drink.result.moderate' :
      vitamins > 50 && hydration > 50 ? 'game.drink.result.healthy' :
      'game.drink.result.balanced';
    return this.translate(key);
  }

  get drinkName(): string {
    if (!this.selectedBase) return '';
    const baseName = this.translate(this.selectedBase.nameKey);
    const ings = this.blenderIngredients.map(i => this.translate(i.nameKey)).slice(0, 2).join(' + ');
    return ings ? `${ings} ${baseName}` : baseName;
  }

  reset(): void {
    this.startGame();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  readonly Math = Math;
}
