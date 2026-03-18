import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Initialize language on component load
    const savedLang = localStorage.getItem('language') || 'ar';
    this.translationService.setLanguage(savedLang);
  }

  students = [
    {
      name: 'Raghda Aouini',
      photo: 'assets/images/raghda.jpg',
      email: 'raghda.aouini16@gmail.com',
      phone: '420 343 25',
      address: 'Mornaguia, La Manouba, Tunis'
    },
    {
      name: 'Nour Imen Bahri',
      photo: 'assets/images/nour.jpg',
      email: 'student2@university.edu',
      phone: '568 274 29',
      address: 'El Jem, Mahdia, Tunisie'
    }
  ];

  games: Game[] = [
    { id: 1, title: '', description: '', ageRange: '6-12', category: '', icon: '🧊', route: '/game/sugar-cubes' },
    { id: 2, title: '', description: '', ageRange: '6-12', category: '', icon: '🧠', route: '/game/true-false' },
    { id: 3, title: '', description: '', ageRange: '5-10', category: '', icon: '🎴', route: '/game/food-memory' },
    { id: 4, title: '', description: '', ageRange: '6-12', category: '', icon: '🧃', route: '/game/make-drink' },
    { id: 5, title: '', description: '', ageRange: '8-12', category: '', icon: '🛍️', route: '/game/smart-shopping' },
    { id: 6, title: '', description: '', ageRange: '6-12', category: '', icon: '🧩', route: '/game/food-pyramid' },
    { id: 7, title: '', description: '', ageRange: '8-12', category: '', icon: '👨‍🍳', route: '/game/future-chef' },
    { id: 8, title: '', description: '', ageRange: '6-12', category: '', icon: '⚖️', route: '/game/habit-balance' },
    { id: 9, title: '', description: '', ageRange: '6-12', category: '', icon: '🕵️', route: '/game/find-mistake' }
  ];

  getGameTitle(gameId: number): string {
    const titles: { [key: number]: string } = {
      1: 'game.sugar.title',
      2: 'game.tf.title',
      3: 'game.memory.title',
      4: 'game.drink.title',
      5: 'game.shopping.title',
      6: 'game.pyramid.title',
      7: 'game.chef.title',
      8: 'game.habit.title',
      9: 'game.mistake.title'
    };
    return this.translate(titles[gameId] || '');
  }

  getGameDescription(gameId: number): string {
    const descriptions: { [key: number]: string } = {
      1: 'game.sugar.description',
      2: 'game.tf.description',
      3: 'game.memory.description',
      4: 'game.drink.description',
      5: 'game.shopping.description',
      6: 'game.pyramid.description',
      7: 'game.chef.description',
      8: 'game.habit.description',
      9: 'game.mistake.description'
    };
    return this.translate(descriptions[gameId] || '');
  }

  getGameCategory(gameId: number): string {
    const categories: { [key: number]: string } = {
      1: 'home.games.category.nutrition',
      2: 'home.games.category.puzzle',
      3: 'home.games.category.puzzle',
      4: 'home.games.category.nutrition',
      5: 'home.games.category.nutrition',
      6: 'home.games.category.puzzle',
      7: 'home.games.category.nutrition',
      8: 'home.games.category.puzzle',
      9: 'home.games.category.puzzle'
    };
    return this.translate(categories[gameId] || '');
  }

  getAgeRange(gameId: number): string {
    return this.games.find(g => g.id === gameId)?.ageRange + ' ' + this.translate('home.games.years') || '';
  }

  playGame(route: string): void {
    this.router.navigate([route]);
  }

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }
}

