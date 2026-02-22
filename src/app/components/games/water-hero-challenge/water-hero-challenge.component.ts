import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

interface PuzzlePiece {
  id: number;
  value: number;
  row: number;
  col: number;
  isEmpty: boolean;
}

@Component({
  selector: 'app-water-hero-challenge',
  templateUrl: './water-hero-challenge.component.html',
  styleUrls: ['./water-hero-challenge.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class WaterHeroChallengeComponent {
  score = 0;
  moves = 0;
  gameStarted = false;
  gameWon = false;
  board: PuzzlePiece[][] = [];
  boardSize = 4;
  emptyRow = 3;
  emptyCol = 3;

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameWon = false;
    this.score = 0;
    this.moves = 0;
    this.initializeBoard();
    this.shuffleBoard();
  }

  initializeBoard(): void {
    this.board = [];
    let value = 1;
    for (let row = 0; row < this.boardSize; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        if (row === this.boardSize - 1 && col === this.boardSize - 1) {
          this.board[row][col] = {
            id: row * this.boardSize + col,
            value: 0,
            row: row,
            col: col,
            isEmpty: true
          };
        } else {
          this.board[row][col] = {
            id: row * this.boardSize + col,
            value: value++,
            row: row,
            col: col,
            isEmpty: false
          };
        }
      }
    }
    this.emptyRow = this.boardSize - 1;
    this.emptyCol = this.boardSize - 1;
  }

  shuffleBoard(): void {
    // Simple shuffle by making random valid moves
    for (let i = 0; i < 100; i++) {
      const directions = this.getValidMoves();
      if (directions.length > 0) {
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        this.movePiece(randomDir.row, randomDir.col);
      }
    }
    this.moves = 0;
  }

  getValidMoves(): { row: number; col: number }[] {
    const moves: { row: number; col: number }[] = [];
    const directions = [
      { row: this.emptyRow - 1, col: this.emptyCol },
      { row: this.emptyRow + 1, col: this.emptyCol },
      { row: this.emptyRow, col: this.emptyCol - 1 },
      { row: this.emptyRow, col: this.emptyCol + 1 }
    ];

    directions.forEach(dir => {
      if (dir.row >= 0 && dir.row < this.boardSize && dir.col >= 0 && dir.col < this.boardSize) {
        moves.push(dir);
      }
    });

    return moves;
  }

  movePiece(row: number, col: number): void {
    if (this.gameWon) return;

    const rowDiff = Math.abs(row - this.emptyRow);
    const colDiff = Math.abs(col - this.emptyCol);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Swap the piece with empty space
      const piece = this.board[row][col];
      const emptyPiece = this.board[this.emptyRow][this.emptyCol];

      this.board[this.emptyRow][this.emptyCol] = piece;
      this.board[row][col] = emptyPiece;

      piece.row = this.emptyRow;
      piece.col = this.emptyCol;
      emptyPiece.row = row;
      emptyPiece.col = col;

      this.emptyRow = row;
      this.emptyCol = col;
      this.moves++;
      this.score = Math.max(0, 1000 - this.moves * 10);

      this.checkWin();
    }
  }

  checkWin(): void {
    let expectedValue = 1;
    let isWon = true;

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (row === this.boardSize - 1 && col === this.boardSize - 1) {
          if (!this.board[row][col].isEmpty) {
            isWon = false;
          }
        } else {
          if (this.board[row][col].value !== expectedValue) {
            isWon = false;
          }
          expectedValue++;
        }
      }
    }

    if (isWon) {
      this.gameWon = true;
      setTimeout(() => {
        alert(`${this.translate('game.sliding.win')} ${this.moves} ${this.translate('game.sliding.moves')} ${this.translate('game.finalScore')}: ${this.score}`);
        this.gameStarted = false;
      }, 500);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
