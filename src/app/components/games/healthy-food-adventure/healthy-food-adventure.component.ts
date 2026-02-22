import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-healthy-food-adventure',
  templateUrl: './healthy-food-adventure.component.html',
  styleUrls: ['./healthy-food-adventure.component.css'],
  animations: [
    trigger('foodAnimation', [
      state('normal', style({ transform: 'translateY(0) scale(1)' })),
      state('selected', style({ transform: 'translateY(-10px) scale(1.1)' })),
      transition('normal => selected', animate('200ms ease-in')),
      transition('selected => normal', animate('200ms ease-out'))
    ]),
    trigger('scoreAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)', opacity: 0 }))
      ])
    ])
  ]
})
export class HealthyFoodAdventureComponent {
  score = 0;
  level = 1;
  lives = 3;
  gameStarted = false;
  gameOver = false;
  selectedFood: string | null = null;
  message = '';

  foods = [
    { name: 'Apple', icon: '🍎', healthy: true },
    { name: 'Carrot', icon: '🥕', healthy: true },
    { name: 'Broccoli', icon: '🥦', healthy: true },
    { name: 'Banana', icon: '🍌', healthy: true },
    { name: 'Pizza', icon: '🍕', healthy: false },
    { name: 'Burger', icon: '🍔', healthy: false },
    { name: 'Candy', icon: '🍬', healthy: false },
    { name: 'Cake', icon: '🎂', healthy: false }
  ];

  currentFoods: any[] = [];

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.gameOver = false;
    this.generateFoods();
  }

  generateFoods(): void {
    const shuffled = [...this.foods].sort(() => Math.random() - 0.5);
    this.currentFoods = shuffled.slice(0, 4);
  }

  selectFood(food: any): void {
    if (this.selectedFood) return;
    
    this.selectedFood = food.name;
    
    setTimeout(() => {
      if (food.healthy) {
        this.score += 10;
        this.message = this.translate('game.healthyFood.great') + ' 🎉';
        setTimeout(() => {
          this.message = '';
          this.level++;
          this.selectedFood = null;
          this.generateFoods();
        }, 1000);
      } else {
        this.lives--;
        this.message = this.translate('game.healthyFood.oops') + ' 😢';
        setTimeout(() => {
          this.message = '';
          if (this.lives <= 0) {
            this.gameOver = true;
          } else {
            this.selectedFood = null;
            this.generateFoods();
          }
        }, 1000);
      }
    }, 500);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  restart(): void {
    this.startGame();
  }
}
