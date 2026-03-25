import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

export interface MarketFood {
  id: string;
  nameKey: string;
  icon: string;
  healthy: boolean;
  tipKey: string;
}

interface CounterSlot {
  left: number;
  top: number;
  rot: number;
  z: number;
  w: number;
}

const LOUPE_SIZE = 76;
const LOUPE_HALF = LOUPE_SIZE / 2;

/** Fixed places along one counter; foods are shuffled into these slots each round — no healthy/unhealthy grouping. */
const COUNTER_SLOTS: CounterSlot[] = [
  { left: 5, top: 60, rot: -6, z: 1, w: 72 },
  { left: 12, top: 54, rot: 5, z: 2, w: 72 },
  { left: 19, top: 62, rot: -3, z: 1, w: 72 },
  { left: 26, top: 52, rot: 7, z: 2, w: 72 },
  { left: 33, top: 58, rot: -4, z: 1, w: 72 },
  { left: 40, top: 55, rot: 4, z: 2, w: 74 },
  { left: 47, top: 61, rot: -5, z: 1, w: 72 },
  { left: 54, top: 53, rot: 6, z: 2, w: 72 },
  { left: 61, top: 59, rot: -3, z: 1, w: 72 },
  { left: 68, top: 56, rot: 5, z: 2, w: 72 },
  { left: 75, top: 62, rot: -7, z: 1, w: 72 },
  { left: 82, top: 54, rot: 4, z: 2, w: 72 },
  { left: 89, top: 60, rot: -4, z: 1, w: 72 },
  { left: 11, top: 68, rot: 3, z: 0, w: 70 },
  { left: 72, top: 67, rot: -5, z: 0, w: 70 }
];

@Component({
  selector: 'app-find-mistake',
  templateUrl: './find-mistake.component.html',
  styleUrls: ['./find-mistake.component.css']
})
export class FindMistakeComponent {
  gameStarted = false;
  foods: MarketFood[] = [...MARKET_FOODS];

  /** Maps each food id → counter slot (re-randomized every startGame). */
  private slotById: Record<string, CounterSlot> = {};

  activeFood: MarketFood | null = null;

  loupeX = 20;
  loupeY = 20;
  loupeVisible = false;

  readonly loupeSize = LOUPE_SIZE;

  @ViewChild('marketBoard') marketBoardRef!: ElementRef<HTMLElement>;
  @ViewChildren('stallTile') stallTiles!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  startGame(): void {
    this.gameStarted = true;
    this.activeFood = null;
    this.loupeVisible = false;
    this.foods = this.shuffle([...MARKET_FOODS]);
    this.assignRandomSlots();
    this.loupeX = 40;
    this.loupeY = 40;
  }

  private assignRandomSlots(): void {
    const ids = MARKET_FOODS.map(f => f.id);
    const slotOrder = ids.map((_, i) => i);
    this.shuffleInPlace(slotOrder);
    this.slotById = {};
    ids.forEach((id, i) => {
      const k = slotOrder[i]!;
      this.slotById[id] = COUNTER_SLOTS[k] ?? COUNTER_SLOTS[0]!;
    });
  }

  private shuffleInPlace(arr: number[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  }

  spotStyle(food: MarketFood): Record<string, string> {
    const s = this.slotById[food.id] ?? COUNTER_SLOTS[0]!;
    return {
      left: `${s.left}%`,
      top: `${s.top}%`,
      width: `${s.w}px`,
      zIndex: String(14 + s.z),
      transform: `translate(-50%, -50%) rotate(${s.rot}deg)`
    };
  }

  onBoardMouseMove(event: MouseEvent): void {
    this.handlePointer(event.clientX, event.clientY);
  }

  onBoardTouchMove(event: TouchEvent): void {
    if (event.touches.length === 0) return;
    event.preventDefault();
    const t = event.touches[0];
    this.handlePointer(t.clientX, t.clientY);
  }

  onBoardTouchStart(event: TouchEvent): void {
    if (event.touches.length === 0) return;
    const t = event.touches[0];
    this.loupeVisible = true;
    this.handlePointer(t.clientX, t.clientY);
  }

  onBoardEnter(): void {
    this.loupeVisible = true;
  }

  onBoardLeave(): void {
    this.loupeVisible = false;
    this.activeFood = null;
  }

  private handlePointer(clientX: number, clientY: number): void {
    const boardEl = this.marketBoardRef?.nativeElement;
    if (!boardEl) return;

    const board = boardEl.getBoundingClientRect();
    if (
      clientX < board.left ||
      clientX > board.right ||
      clientY < board.top ||
      clientY > board.bottom
    ) {
      this.activeFood = null;
      return;
    }

    this.loupeX = clientX - board.left - LOUPE_HALF;
    this.loupeY = clientY - board.top - LOUPE_HALF;
    this.loupeX = Math.max(0, Math.min(this.loupeX, board.width - LOUPE_SIZE));
    this.loupeY = Math.max(0, Math.min(this.loupeY, board.height - LOUPE_SIZE));

    this.pickFoodAt(clientX, clientY);
  }

  private pickFoodAt(clientX: number, clientY: number): void {
    const tiles = this.stallTiles;
    if (!tiles || tiles.length === 0) {
      this.activeFood = null;
      return;
    }

    let hit: MarketFood | null = null;
    tiles.forEach(ref => {
      const el = ref.nativeElement;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
        const id = el.dataset['foodId'];
        if (id) {
          hit = this.foods.find(f => f.id === id) ?? null;
        }
      }
    });
    this.activeFood = hit;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}

const MARKET_FOODS: MarketFood[] = [
  { id: 'apple', nameKey: 'game.mistake.food.apple', icon: '🍎', healthy: true, tipKey: 'game.mistake.tip.apple' },
  { id: 'banana', nameKey: 'game.mistake.food.banana', icon: '🍌', healthy: true, tipKey: 'game.mistake.tip.banana' },
  { id: 'broccoli', nameKey: 'game.mistake.food.broccoli', icon: '🥦', healthy: true, tipKey: 'game.mistake.tip.broccoli' },
  { id: 'carrot', nameKey: 'game.mistake.food.carrot', icon: '🥕', healthy: true, tipKey: 'game.mistake.tip.carrot' },
  { id: 'bread', nameKey: 'game.mistake.food.bread', icon: '🍞', healthy: true, tipKey: 'game.mistake.tip.bread' },
  { id: 'milk', nameKey: 'game.mistake.food.milk', icon: '🥛', healthy: true, tipKey: 'game.mistake.tip.milk' },
  { id: 'fish', nameKey: 'game.mistake.food.fish', icon: '🐟', healthy: true, tipKey: 'game.mistake.tip.fish' },
  { id: 'egg', nameKey: 'game.mistake.food.egg', icon: '🥚', healthy: true, tipKey: 'game.mistake.tip.egg' },
  { id: 'grapes', nameKey: 'game.mistake.food.grapes', icon: '🍇', healthy: true, tipKey: 'game.mistake.tip.grapes' },
  { id: 'soda', nameKey: 'game.mistake.food.soda', icon: '🥤', healthy: false, tipKey: 'game.mistake.tip.soda' },
  { id: 'candy', nameKey: 'game.mistake.food.candy', icon: '🍬', healthy: false, tipKey: 'game.mistake.tip.candy' },
  { id: 'chips', nameKey: 'game.mistake.food.chips', icon: '🍟', healthy: false, tipKey: 'game.mistake.tip.chips' },
  { id: 'donut', nameKey: 'game.mistake.food.donut', icon: '🍩', healthy: false, tipKey: 'game.mistake.tip.donut' },
  { id: 'cake', nameKey: 'game.mistake.food.cake', icon: '🍰', healthy: false, tipKey: 'game.mistake.tip.cake' },
  { id: 'hotdog', nameKey: 'game.mistake.food.hotdog', icon: '🌭', healthy: false, tipKey: 'game.mistake.tip.hotdog' }
];
