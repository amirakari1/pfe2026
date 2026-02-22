import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    <div class="language-switcher">
      <button 
        class="lang-btn" 
        [class.active]="currentLang === 'ar'"
        (click)="switchLanguage('ar')">
        العربية
      </button>
      <button 
        class="lang-btn" 
        [class.active]="currentLang === 'en'"
        (click)="switchLanguage('en')">
        English
      </button>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .lang-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .lang-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .lang-btn.active {
      background: white;
      color: #667eea;
      border-color: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    [dir="rtl"] .language-switcher {
      flex-direction: row-reverse;
    }
  `]
})
export class LanguageSwitcherComponent {
  currentLang = 'ar';

  constructor(private translationService: TranslationService) {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  switchLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }
}


