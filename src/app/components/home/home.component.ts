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

  formData = {
    name: '',
    email: '',
    message: ''
  };

  games: Game[] = [
    {
      id: 1,
      title: '',
      description: '',
      ageRange: '5-8',
      category: '',
      icon: '🍎',
      route: '/game/healthy-food-adventure'
    },
    {
      id: 2,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/exercise-quest'
    },
    {
      id: 3,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/portion-control-puzzle'
    },
    {
      id: 4,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/water-hero-challenge'
    },
    {
      id: 5,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/sleep-time-stories'
    },
    {
      id: 6,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/garden-grower'
    },
    {
      id: 7,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/active-playground'
    },
    {
      id: 8,
      title: '',
      description: '',
      ageRange: '6-12',
      category: '',
      icon: '✨',
      route: '/game/meal-planner-master'
    }
  ];

  getGameTitle(gameId: number): string {
    const titles: { [key: number]: string } = {
      1: 'game.healthyFood.title',
      2: 'game.exercise.title',
      3: 'game.memory.title',
      4: 'game.sliding.title',
      5: 'game.sleep.title',
      6: 'game.garden.title',
      7: 'game.playground.title',
      8: 'game.meal.title'
    };
    return this.translate(titles[gameId] || '');
  }

  getGameDescription(gameId: number): string {
    const descriptions: { [key: number]: string } = {
      1: 'game.healthyFood.description',
      2: 'game.exercise.description',
      3: 'game.memory.description',
      4: 'game.sliding.description',
      5: 'game.sleep.description',
      6: 'game.garden.description',
      7: 'game.playground.description',
      8: 'game.meal.description'
    };
    return this.translate(descriptions[gameId] || '');
  }

  getGameCategory(gameId: number): string {
    const categories: { [key: number]: string } = {
      1: 'home.games.category.nutrition',
      2: 'home.games.category.puzzle',
      3: 'home.games.category.puzzle',
      4: 'home.games.category.puzzle',
      5: 'home.games.category.puzzle',
      6: 'home.games.category.puzzle',
      7: 'home.games.category.puzzle',
      8: 'home.games.category.puzzle'
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

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    alert(this.translationService.getTranslation('home.contact.success'));
    this.formData = { name: '', email: '', message: '' };
  }
}

