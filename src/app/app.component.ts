import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'pfe-2026-web';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    // Initialize language on app start
    const savedLang = localStorage.getItem('language') || 'ar';
    this.translationService.setLanguage(savedLang);
  }
}

