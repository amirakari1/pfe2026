import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameFeedbackService } from '../../services/game-feedback.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-game-feedback-overlay',
  templateUrl: './game-feedback-overlay.component.html',
  styleUrls: ['./game-feedback-overlay.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameFeedbackOverlayComponent {
  readonly state$ = this.feedback.state$;

  readonly confettiPieces = [
    { delay: 0, x: 12, color: '#22c55e' },
    { delay: 1, x: 25, color: '#eab308' },
    { delay: 2, x: 38, color: '#3b82f6' },
    { delay: 0, x: 52, color: '#ec4899' },
    { delay: 1, x: 65, color: '#22c55e' },
    { delay: 2, x: 78, color: '#f97316' },
    { delay: 0, x: 88, color: '#8b5cf6' },
    { delay: 1, x: 18, color: '#06b6d4' },
    { delay: 2, x: 45, color: '#eab308' },
    { delay: 0, x: 72, color: '#ec4899' },
    { delay: 1, x: 92, color: '#22c55e' },
    { delay: 2, x: 8, color: '#f97316' }
  ];

  constructor(
    public feedback: GameFeedbackService,
    private translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
