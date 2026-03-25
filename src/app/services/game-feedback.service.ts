import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type GameFeedbackKind = 'success' | 'fail' | null;

export interface GameFeedbackState {
  kind: GameFeedbackKind;
}

@Injectable({
  providedIn: 'root'
})
export class GameFeedbackService {
  private readonly stateSubject = new BehaviorSubject<GameFeedbackState>({ kind: null });
  readonly state$ = this.stateSubject.asObservable();

  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly displayMs = 1000;

  celebrate(): void {
    this.show('success');
  }

  fail(): void {
    this.show('fail');
  }

  private show(kind: 'success' | 'fail'): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.stateSubject.next({ kind });
    this.hideTimer = setTimeout(() => {
      this.stateSubject.next({ kind: null });
      this.hideTimer = null;
    }, this.displayMs);
  }
}
