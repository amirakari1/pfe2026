import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  private readonly resolvedThemeSubject = new BehaviorSubject<'light' | 'dark'>(this.resolveTheme());

  readonly theme$ = this.themeSubject.asObservable();
  readonly resolvedTheme$ = this.resolvedThemeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
    this.themeSubject.subscribe(theme => {
      const resolved = this.resolveTheme();
      this.resolvedThemeSubject.next(resolved);
      this.applyTheme(theme);
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.themeSubject.value === 'system') {
        const resolved = this.resolveTheme();
        this.resolvedThemeSubject.next(resolved);
        this.applyTheme('system');
      }
    });
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  getTheme(): Theme {
    return this.themeSubject.value;
  }

  getResolvedTheme(): 'light' | 'dark' {
    return this.resolvedThemeSubject.value;
  }

  toggleTheme(): void {
    const resolved = this.getResolvedTheme();
    this.setTheme(resolved === 'dark' ? 'light' : 'dark');
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
  }

  private resolveTheme(): 'light' | 'dark' {
    const theme = this.themeSubject.value;
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }

  private applyTheme(theme: Theme): void {
    const resolved = this.resolveTheme();
    document.documentElement.setAttribute('data-theme', resolved);
  }
}
