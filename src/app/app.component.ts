import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="theme-toggle-fixed">
      <app-theme-toggle></app-theme-toggle>
    </div>
  `,
  styles: [`
    .theme-toggle-fixed {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    [dir="rtl"] .theme-toggle-fixed {
      right: auto;
      left: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'pfe-2026-web';

  constructor(
    private translationService: TranslationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'ar';
    this.translationService.setLanguage(savedLang);
  }
}

