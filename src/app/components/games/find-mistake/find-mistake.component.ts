import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface Mistake {
  id: string;
  x: number;
  y: number;
  message: string;
  found: boolean;
}

@Component({
  selector: 'app-find-mistake',
  templateUrl: './find-mistake.component.html',
  styleUrls: ['./find-mistake.component.css']
})
export class FindMistakeComponent {
  gameStarted = false;
  mistakes: Mistake[] = [];
  foundCount = 0;

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.mistakes = [
      { id: 'soda', x: 25, y: 30, message: 'game.mistake.soda', found: false },
      { id: 'vegetables', x: 70, y: 55, message: 'game.mistake.vegetables', found: false },
      { id: 'milk', x: 15, y: 65, message: 'game.mistake.milk', found: false }
    ];
    this.foundCount = 0;
  }

  findMistake(m: Mistake): void {
    if (m.found) return;
    m.found = true;
    this.foundCount++;
  }

  get allFound(): boolean {
    return this.mistakes.length > 0 && this.mistakes.every(m => m.found);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
