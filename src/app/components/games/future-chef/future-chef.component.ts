import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

export interface ChefIngredient {
  id: string;
  nameKey: string;
  icon: string;
  type: 'carb' | 'protein' | 'vegetable' | 'unhealthy';
}

const PANTRY_ID = 'chef-pantry';
const POT_ID = 'chef-pot';

@Component({
  selector: 'app-future-chef',
  templateUrl: './future-chef.component.html',
  styleUrls: ['./future-chef.component.css']
})
export class FutureChefComponent {
  gameStarted = false;
  pantry: ChefIngredient[] = [];
  pot: ChefIngredient[] = [];
  cookingMethod = '';
  combining = false;
  submitted = false;
  stars = 0;
  message = '';
  dishDescription = '';

  readonly listIds = { pantry: PANTRY_ID, pot: POT_ID };
  readonly connectedDropLists = [PANTRY_ID, POT_ID];

  readonly ingredientsTemplate: ChefIngredient[] = [
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

  private readonly combineMs = 2000;

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
    this.pantry = this.ingredientsTemplate.map(i => ({ ...i }));
    this.pot = [];
    this.cookingMethod = '';
    this.combining = false;
    this.submitted = false;
    this.message = '';
    this.dishDescription = '';
    this.stars = 0;
  }

  drop(event: CdkDragDrop<ChefIngredient[]>): void {
    if (this.submitted || this.combining) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  cookMeal(): void {
    if (this.pot.length === 0 || !this.cookingMethod || this.submitted || this.combining) return;

    this.dishDescription = this.buildDishDescription();
    this.combining = true;

    window.setTimeout(() => {
      this.combining = false;
      this.finalizeMeal();
    }, this.combineMs);
  }

  private buildDishDescription(): string {
    const parts = this.pot.map(i => this.translate(i.nameKey));
    const methodEntry = this.methods.find(m => m.id === this.cookingMethod);
    const methodLabel = methodEntry ? this.translate(methodEntry.name) : '';
    const joined = parts.slice(0, 5).join(' + ');
    return methodLabel ? `${joined} · ${methodLabel}` : joined;
  }

  private finalizeMeal(): void {
    this.submitted = true;
    const hasCarb = this.pot.some(i => i.type === 'carb');
    const hasProtein = this.pot.some(i => i.type === 'protein');
    const hasVegetable = this.pot.some(i => i.type === 'vegetable');
    const hasUnhealthy = this.pot.some(i => i.type === 'unhealthy');
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
      this.gameFeedback.celebrate();
    } else if (score >= 2) {
      this.stars = 3;
      this.message = this.translate('game.chef.good');
      this.gameFeedback.celebrate();
    } else {
      this.stars = 2;
      this.message = this.translate('game.chef.poor');
      this.gameFeedback.fail();
    }
  }

  getStars(): string {
    return '⭐'.repeat(this.stars);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
