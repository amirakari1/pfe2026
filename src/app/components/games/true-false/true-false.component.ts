import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

interface Question {
  text: string;
  answer: boolean;
}

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.css']
})
export class TrueFalseComponent {
  gameStarted = false;
  currentIndex = 0;
  score = 0;
  feedback = '';
  showFeedback = false;

  questions: Question[] = [
    { text: 'game.tf.q1', answer: true },
    { text: 'game.tf.q2', answer: false },
    { text: 'game.tf.q3', answer: true },
    { text: 'game.tf.q4', answer: false },
    { text: 'game.tf.q5', answer: true },
    { text: 'game.tf.q6', answer: false },
    { text: 'game.tf.q7', answer: true },
    { text: 'game.tf.q8', answer: false }
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
    this.currentIndex = 0;
    this.score = 0;
    this.feedback = '';
    this.showFeedback = false;
    this.shuffleQuestions();
  }

  shuffleQuestions(): void {
    this.questions = [...this.questions].sort(() => Math.random() - 0.5);
  }

  answerQuestion(userAnswer: boolean): void {
    if (this.showFeedback) return;
    const correct = this.questions[this.currentIndex].answer === userAnswer;
    this.showFeedback = true;
    if (correct) {
      this.score += 10;
      this.feedback = '✅ ' + this.translate('game.tf.correct');
      this.gameFeedback.celebrate();
    } else {
      this.feedback = '❌ ' + this.translate('game.tf.wrong');
      this.gameFeedback.fail();
    }
  }

  nextQuestion(): void {
    this.showFeedback = false;
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.currentIndex = -1;
    }
  }

  get currentQuestion(): Question | null {
    return this.currentIndex >= 0 && this.currentIndex < this.questions.length
      ? this.questions[this.currentIndex] : null;
  }

  get gameOver(): boolean {
    return this.currentIndex >= this.questions.length || this.currentIndex < 0;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
