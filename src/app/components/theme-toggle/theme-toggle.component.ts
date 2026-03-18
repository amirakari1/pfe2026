import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <div class="theme-toggle">
      <button
        class="theme-btn"
        (click)="toggle()"
        [attr.aria-label]="(resolvedTheme$ | async) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        title="{{ (resolvedTheme$ | async) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode' }}">
        <span class="icon-light" *ngIf="(resolvedTheme$ | async) === 'dark'">☀️</span>
        <span class="icon-dark" *ngIf="(resolvedTheme$ | async) === 'light'">🌙</span>
      </button>
    </div>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
    }

    .theme-btn {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 2px solid var(--border-color);
      background: var(--bg-surface);
      color: var(--text-dark);
      font-size: 1.3rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
    }

    .theme-btn:hover {
      transform: scale(1.05);
      box-shadow: var(--shadow-hover);
      border-color: var(--primary-color);
    }

    .theme-btn .icon-light,
    .theme-btn .icon-dark {
      display: block;
      line-height: 1;
    }
  `]
})
export class ThemeToggleComponent {
  resolvedTheme$ = this.themeService.resolvedTheme$;

  constructor(private themeService: ThemeService) {}

  toggle(): void {
    this.themeService.toggleTheme();
  }
}
