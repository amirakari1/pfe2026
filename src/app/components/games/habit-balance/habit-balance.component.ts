import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

interface Habit {
  id: string;
  nameKey: string;
  icon: string;
  value: number;
}

@Component({
  selector: 'app-habit-balance',
  templateUrl: './habit-balance.component.html',
  styleUrls: ['./habit-balance.component.css']
})
export class HabitBalanceComponent {
  gameStarted = false;
  leftHabits: Habit[] = [];
  rightHabits: Habit[] = [];
  totalScore = 0;
  submitted = false;
  message = '';

  habits: Habit[] = [
    { id: 'sport', nameKey: 'game.habit.item.sport', icon: '🏃‍♂️', value: 2 },
    { id: 'sleep', nameKey: 'game.habit.item.sleep', icon: '😴', value: 2 },
    { id: 'fastfood', nameKey: 'game.habit.item.fastfood', icon: '🍔', value: -2 },
    { id: 'screen', nameKey: 'game.habit.item.screen', icon: '📱', value: -1 },
    { id: 'water', nameKey: 'game.habit.item.water', icon: '💧', value: 2 },
    { id: 'candy', nameKey: 'game.habit.item.candy', icon: '🍬', value: -2 }
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
    this.leftHabits = [...this.habits];
    this.rightHabits = [];
    this.totalScore = 0;
    this.submitted = false;
    this.message = '';
    this.shuffle(this.leftHabits);
  }

  shuffle(arr: Habit[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  moveToRight(habit: Habit): void {
    if (this.submitted) return;
    const idx = this.leftHabits.indexOf(habit);
    if (idx >= 0) {
      this.leftHabits.splice(idx, 1);
      this.rightHabits.push(habit);
      this.totalScore += habit.value;
    }
  }

  moveToLeft(habit: Habit): void {
    if (this.submitted) return;
    const idx = this.rightHabits.indexOf(habit);
    if (idx >= 0) {
      this.rightHabits.splice(idx, 1);
      this.leftHabits.push(habit);
      this.totalScore -= habit.value;
    }
  }

  submit(): void {
    this.submitted = true;
    if (this.totalScore > 0) {
      this.message = this.translate('game.habit.healthy');
      this.gameFeedback.celebrate();
    } else {
      this.message = this.translate('game.habit.unhealthy');
      this.gameFeedback.fail();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
