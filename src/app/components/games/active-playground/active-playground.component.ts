import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface PuzzleTile {
  id: number;
  type: string;
  icon: string;
  row: number;
  col: number;
  selected: boolean;
}

@Component({
  selector: 'app-active-playground',
  templateUrl: './active-playground.component.html',
  styleUrls: ['./active-playground.component.css'],
  animations: [
    trigger('tileAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('selected', style({ transform: 'scale(1.1)' })),
      transition('normal => selected', animate('200ms')),
      transition('selected => normal', animate('200ms'))
    ])
  ]
})
export class ActivePlaygroundComponent {
  score = 0;
  moves = 25;
  gameStarted = false;
  selectedTile: PuzzleTile | null = null;
  board: PuzzleTile[][] = [];
  boardSize = 6;

  activityTypes = [
    { type: 'jump', icon: '🦘', color: '#FF6B6B' },
    { type: 'run', icon: '🏃', color: '#4ECDC4' },
    { type: 'dance', icon: '💃', color: '#F38181' },
    { type: 'stretch', icon: '🧘', color: '#95E1D3' }
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
    this.moves = 25;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [];
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        const randomType = this.activityTypes[Math.floor(Math.random() * this.activityTypes.length)];
        this.board[row][col] = {
          id: row * this.boardSize + col,
          type: randomType.type,
          icon: randomType.icon,
          row: row,
          col: col,
          selected: false
        };
      }
    }
  }

  selectTile(tile: PuzzleTile): void {
    if (this.moves <= 0) return;
    if (this.selectedTile === null) {
      this.selectedTile = tile;
      tile.selected = true;
    } else if (this.selectedTile === tile) {
      this.selectedTile.selected = false;
      this.selectedTile = null;
    } else {
      const isAdjacent = this.isAdjacent(this.selectedTile, tile);
      if (isAdjacent) {
        this.swapTiles(this.selectedTile, tile);
        this.selectedTile.selected = false;
        this.selectedTile = null;
        this.moves--;
        setTimeout(() => this.checkMatches(), 300);
      } else {
        this.selectedTile.selected = false;
        this.selectedTile = tile;
        tile.selected = true;
      }
    }
  }

  isAdjacent(tile1: PuzzleTile, tile2: PuzzleTile): boolean {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  swapTiles(tile1: PuzzleTile, tile2: PuzzleTile): void {
    const tempType = tile1.type;
    const tempIcon = tile1.icon;
    tile1.type = tile2.type;
    tile1.icon = tile2.icon;
    tile2.type = tempType;
    tile2.icon = tempIcon;
  }

  checkMatches(): void {
    let matchedCount = 0;
    const matchedIds = new Set<number>();

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
      const tile = this.findTileById(id);
      if (tile) {
        matchedCount++;
        this.score += 10;
        const randomType = this.activityTypes[Math.floor(Math.random() * this.activityTypes.length)];
        tile.type = randomType.type;
        tile.icon = randomType.icon;
      }
    });

    if (matchedCount > 0 && this.moves > 0) {
      setTimeout(() => this.checkMatches(), 300);
    } else if (this.moves <= 0) {
      setTimeout(() => {
        alert(`${this.translate('game.playground.workout')}! ${this.translate('game.finalScore')}: ${this.score}`);
        this.gameStarted = false;
      }, 500);
    }
  }

  findTileById(id: number): PuzzleTile | null {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.board[row][col].id === id) return this.board[row][col];
      }
    }
    return null;
  }

  getTileColor(type: string): string {
    const activityType = this.activityTypes.find(a => a.type === type);
    return activityType ? activityType.color : '#ffffff';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
