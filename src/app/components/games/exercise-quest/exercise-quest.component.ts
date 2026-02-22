import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface PuzzleBlock {
  id: number;
  type: string;
  icon: string;
  row: number;
  col: number;
  selected: boolean;
}

@Component({
  selector: 'app-exercise-quest',
  templateUrl: './exercise-quest.component.html',
  styleUrls: ['./exercise-quest.component.css'],
  animations: [
    trigger('blockAnimation', [
      state('normal', style({ transform: 'rotate(0deg) scale(1)' })),
      state('selected', style({ transform: 'rotate(5deg) scale(1.1)' })),
      transition('normal => selected', animate('200ms ease-in')),
      transition('selected => normal', animate('200ms ease-out'))
    ]),
    trigger('characterAnimation', [
      state('idle', style({ transform: 'translateY(0)' })),
      state('active', style({ transform: 'translateY(-30px) rotate(360deg)' })),
      transition('idle => active', animate('600ms ease-in-out')),
      transition('active => idle', animate('300ms ease-in'))
    ])
  ]
})
export class ExerciseQuestComponent {
  score = 0;
  level = 1;
  gameStarted = false;
  selectedBlock: PuzzleBlock | null = null;
  board: PuzzleBlock[][] = [];
  boardSize = 6;
  characterState = 'idle';
  moves = 20;

  exerciseTypes = [
    { type: 'jump', icon: '🤸', color: '#FF6B6B' },
    { type: 'run', icon: '🏃', color: '#4ECDC4' },
    { type: 'stretch', icon: '🧘', color: '#95E1D3' },
    { type: 'dance', icon: '💃', color: '#F38181' }
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
    this.score = 0;
    this.level = 1;
    this.moves = 20;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [];
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        const randomExercise = this.exerciseTypes[Math.floor(Math.random() * this.exerciseTypes.length)];
        this.board[row][col] = {
          id: row * this.boardSize + col,
          type: randomExercise.type,
          icon: randomExercise.icon,
          row: row,
          col: col,
          selected: false
        };
      }
    }
  }

  selectBlock(block: PuzzleBlock): void {
    if (this.moves <= 0) return;

    if (this.selectedBlock === null) {
      this.selectedBlock = block;
      block.selected = true;
    } else if (this.selectedBlock === block) {
      this.selectedBlock.selected = false;
      this.selectedBlock = null;
    } else {
      const isAdjacent = this.isAdjacent(this.selectedBlock, block);
      if (isAdjacent) {
        this.swapBlocks(this.selectedBlock, block);
        this.selectedBlock.selected = false;
        this.selectedBlock = null;
        this.moves--;
        this.characterState = 'active';
        setTimeout(() => {
          this.checkMatches();
          this.characterState = 'idle';
        }, 600);
      } else {
        this.selectedBlock.selected = false;
        this.selectedBlock = block;
        block.selected = true;
      }
    }
  }

  isAdjacent(block1: PuzzleBlock, block2: PuzzleBlock): boolean {
    const rowDiff = Math.abs(block1.row - block2.row);
    const colDiff = Math.abs(block1.col - block2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  swapBlocks(block1: PuzzleBlock, block2: PuzzleBlock): void {
    const tempType = block1.type;
    const tempIcon = block1.icon;

    block1.type = block2.type;
    block1.icon = block2.icon;
    block2.type = tempType;
    block2.icon = tempIcon;
  }

  checkMatches(): void {
    let matchedCount = 0;
    const matchedIds = new Set<number>();

    // Check horizontal matches
    for (let row = 0; row < this.boardSize; row++) {
      let count = 1;
      for (let col = 1; col < this.boardSize; col++) {
        if (this.board[row][col].type === this.board[row][col - 1].type) {
          count++;
          if (count >= 3) {
            for (let i = col - count + 1; i <= col; i++) {
              matchedIds.add(this.board[row][i].id);
            }
          }
        } else {
          count = 1;
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < this.boardSize; col++) {
      let count = 1;
      for (let row = 1; row < this.boardSize; row++) {
        if (this.board[row][col].type === this.board[row - 1][col].type) {
          count++;
          if (count >= 3) {
            for (let i = row - count + 1; i <= row; i++) {
              matchedIds.add(this.board[i][col].id);
            }
          }
        } else {
          count = 1;
        }
      }
    }

    matchedIds.forEach(id => {
      const block = this.findBlockById(id);
      if (block) {
        matchedCount++;
        this.score += 15;
      }
    });

    if (matchedCount > 0) {
      setTimeout(() => {
        this.removeMatchedBlocks(matchedIds);
        this.fillBoard();
        if (this.moves > 0) {
          setTimeout(() => this.checkMatches(), 300);
        } else {
          setTimeout(() => {
            alert(`${this.translate('game.exercise.workout')} ${this.translate('game.finalScore')}: ${this.score}`);
            this.gameStarted = false;
          }, 500);
        }
      }, 300);
    } else if (this.moves <= 0) {
      setTimeout(() => {
        alert(`${this.translate('game.exercise.complete')} ${this.translate('game.finalScore')}: ${this.score}`);
        this.gameStarted = false;
      }, 500);
    }
  }

  findBlockById(id: number): PuzzleBlock | null {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.board[row][col].id === id) {
          return this.board[row][col];
        }
      }
    }
    return null;
  }

  removeMatchedBlocks(matchedIds: Set<number>): void {
    matchedIds.forEach(id => {
      const block = this.findBlockById(id);
      if (block) {
        const randomExercise = this.exerciseTypes[Math.floor(Math.random() * this.exerciseTypes.length)];
        block.type = randomExercise.type;
        block.icon = randomExercise.icon;
      }
    });
  }

  fillBoard(): void {
    // Simple fill - in a real game, tiles would fall down
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        // Already handled in removeMatchedBlocks
      }
    }
  }

  getBlockColor(type: string): string {
    const exercise = this.exerciseTypes.find(e => e.type === type);
    return exercise ? exercise.color : '#ffffff';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
