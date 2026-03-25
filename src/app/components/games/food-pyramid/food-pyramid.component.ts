import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { GameFeedbackService } from '../../../services/game-feedback.service';

export type PyramidLevel = 'carbs' | 'fruits' | 'sweets';

export interface FoodItem {
  id: string;
  nameKey: string;
  icon: string;
  imageUrl: string;
  /** Primary band (used when `acceptableZones` is omitted). */
  level: PyramidLevel;
  /** If set, dropping on any of these bands counts as correct (e.g. potato: starch or veg). */
  acceptableZones?: PyramidLevel[];
  imgBroken?: boolean;
}

const ALL_FOODS: FoodItem[] = [
  { id: 'bread', nameKey: 'game.pyramid.food.bread', icon: '🍞', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&q=80', level: 'carbs' },
  { id: 'rice', nameKey: 'game.pyramid.food.rice', icon: '🍚', imageUrl: 'https://images.unsplash.com/photo-1516684732162-798137006956?w=200&h=200&fit=crop&q=80', level: 'carbs' },
  { id: 'pasta', nameKey: 'game.pyramid.food.pasta', icon: '🍝', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop&q=80', level: 'carbs' },
  {
    id: 'potato',
    nameKey: 'game.pyramid.food.potato',
    icon: '🥔',
    imageUrl: 'https://images.unsplash.com/photo-1518977822532-39baf8104fb0?w=200&h=200&fit=crop&q=80',
    level: 'carbs',
    acceptableZones: ['carbs', 'fruits']
  },
  { id: 'cereal', nameKey: 'game.pyramid.food.cereal', icon: '🥣', imageUrl: 'https://images.unsplash.com/photo-1495214783159-7543c29a9481?w=200&h=200&fit=crop&q=80', level: 'carbs' },
  { id: 'kaak', nameKey: 'game.pyramid.food.kaak', icon: '🥨', imageUrl: 'assets/drinks/kaak.jpg', level: 'sweets' },
  { id: 'apple', nameKey: 'game.pyramid.food.apple', icon: '🍎', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d04a7f?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'carrot', nameKey: 'game.pyramid.food.carrot', icon: '🥕', imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'broccoli', nameKey: 'game.pyramid.food.broccoli', icon: '🥦', imageUrl: 'https://images.unsplash.com/photo-1584270354949-4c80b918b4f8?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'tomato', nameKey: 'game.pyramid.food.tomato', icon: '🍅', imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcddd32f?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'banana', nameKey: 'game.pyramid.food.banana', icon: '🍌', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'salad', nameKey: 'game.pyramid.food.salad', icon: '🥗', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&q=80', level: 'fruits' },
  { id: 'dates', nameKey: 'game.pyramid.food.dates', icon: '🌴', imageUrl: 'assets/drinks/dates.jpg', level: 'fruits' },
  { id: 'candy', nameKey: 'game.pyramid.food.candy', icon: '🍬', imageUrl: 'assets/drinks/bonbon.jpg', level: 'sweets' },
  { id: 'cake', nameKey: 'game.pyramid.food.cake', icon: '🎂', imageUrl: 'assets/drinks/cake.jpg', level: 'sweets' },
  { id: 'donut', nameKey: 'game.pyramid.food.donut', icon: '🍩', imageUrl: 'assets/drinks/donut.jpg', level: 'sweets' },
  { id: 'icecream', nameKey: 'game.pyramid.food.icecream', icon: '🍨', imageUrl: 'assets/drinks/glace.jpg', level: 'sweets' },
  { id: 'chocolate', nameKey: 'game.pyramid.food.chocolate', icon: '🍫', imageUrl: 'assets/drinks/chocolat.png', level: 'sweets' },
  { id: 'zlabia', nameKey: 'game.pyramid.food.zlabia', icon: '🍯', imageUrl: 'assets/drinks/zlabia.jpg', level: 'sweets' },
  { id: 'soda', nameKey: 'game.pyramid.food.soda', icon: '🥤', imageUrl: 'assets/drinks/slim.jpg', level: 'sweets' }
];

const LIST_IDS = {
  bank: 'pyramid-bank',
  carbs: 'pyramid-carbs',
  fruits: 'pyramid-fruits',
  sweets: 'pyramid-sweets'
} as const;

@Component({
  selector: 'app-food-pyramid',
  templateUrl: './food-pyramid.component.html',
  styleUrls: ['./food-pyramid.component.css']
})
export class FoodPyramidComponent {
  gameStarted = false;
  bank: FoodItem[] = [];
  zoneCarbs: FoodItem[] = [];
  zoneFruits: FoodItem[] = [];
  zoneSweets: FoodItem[] = [];
  hint = '';

  readonly foods = ALL_FOODS;
  readonly listIds = LIST_IDS;
  readonly zoneIds = [LIST_IDS.carbs, LIST_IDS.fruits, LIST_IDS.sweets, LIST_IDS.bank];

  readonly levels: { id: PyramidLevel; listId: string; label: string; short: string }[] = [
    { id: 'sweets', listId: LIST_IDS.sweets, label: 'game.pyramid.sweets', short: 'game.pyramid.short.sweets' },
    { id: 'fruits', listId: LIST_IDS.fruits, label: 'game.pyramid.fruits', short: 'game.pyramid.short.fruits' },
    { id: 'carbs', listId: LIST_IDS.carbs, label: 'game.pyramid.carbs', short: 'game.pyramid.short.carbs' }
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
    this.zoneCarbs = [];
    this.zoneFruits = [];
    this.zoneSweets = [];
    this.bank = [...this.foods].sort(() => Math.random() - 0.5);
    this.hint = '';
    this.foods.forEach(f => {
      if (f.imgBroken) f.imgBroken = false;
    });
  }

  get connectedLists(): string[] {
    return this.zoneIds;
  }

  drop(event: CdkDragDrop<FoodItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const destId = event.container.id;

    if (destId === LIST_IDS.bank) {
      this.hint = '';
      return;
    }

    const zone = this.listIdToLevel(destId);
    if (!zone) return;

    const item = event.container.data[event.currentIndex];

    if (this.isCorrectPlacement(item, zone)) {
      this.hint = '✅ ' + this.translate('game.pyramid.correct');
      this.gameFeedback.celebrate();
      return;
    }

    this.hint = '❌ ' + this.translate('game.pyramid.wrong');
    this.gameFeedback.fail();

    const wrongZoneList = event.container.data;
    const at = event.currentIndex;
    const [returned] = wrongZoneList.splice(at, 1);
    this.bank.push(returned);
  }

  private listIdToLevel(id: string): PyramidLevel | null {
    if (id === LIST_IDS.carbs) return 'carbs';
    if (id === LIST_IDS.fruits) return 'fruits';
    if (id === LIST_IDS.sweets) return 'sweets';
    return null;
  }

  private isCorrectPlacement(food: FoodItem, zone: PyramidLevel): boolean {
    const allowed = food.acceptableZones ?? [food.level];
    return allowed.includes(zone);
  }

  get correctPlacementCount(): number {
    let n = 0;
    this.zoneCarbs.forEach(f => {
      if (this.isCorrectPlacement(f, 'carbs')) n++;
    });
    this.zoneFruits.forEach(f => {
      if (this.isCorrectPlacement(f, 'fruits')) n++;
    });
    this.zoneSweets.forEach(f => {
      if (this.isCorrectPlacement(f, 'sweets')) n++;
    });
    return n;
  }

  get gameComplete(): boolean {
    const n = this.zoneCarbs.length + this.zoneFruits.length + this.zoneSweets.length;
    return this.foods.length > 0 && this.bank.length === 0 && n === this.foods.length;
  }

  getZoneForListId(listId: string): FoodItem[] {
    if (listId === LIST_IDS.carbs) return this.zoneCarbs;
    if (listId === LIST_IDS.fruits) return this.zoneFruits;
    if (listId === LIST_IDS.sweets) return this.zoneSweets;
    return this.bank;
  }

  onImageError(food: FoodItem): void {
    food.imgBroken = true;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
