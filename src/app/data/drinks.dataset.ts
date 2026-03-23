/**
 * Sugar Cubes Game - Tunisian Drinks & Food Dataset
 * For use in Tunisia. Includes Tunisian beverages and common foods (bonbon, cake, etc.).
 * 1 sugar cube ≈ 4g sugar (WHO standard).
 * Sources: Tunisian product labels, USDA, nutrition databases.
 * Images: Local assets in src/assets/drinks/ (from Unsplash, Pexels - free to use)
 */
export interface DrinkEntry {
  id: string;
  nameKey: string;
  altKey: string;
  icon: string;
  image: string;
  cubes: number;
  grams?: number;
}

const img = (name: string) => `assets/drinks/${name}.jpg`;

export const DRINKS_DATASET: DrinkEntry[] = [
  // Tunisian Drinks – Boissons tunisoises
  { id: 'bogacidre', nameKey: 'game.sugar.item.bogacidre', altKey: 'game.sugar.alt.bogacidre', icon: '🥤', image: 'assets/drinks/bogacidre.jpg', cubes: 7, grams: 28 },
  { id: 'citronnade', nameKey: 'game.sugar.item.citronnade', altKey: 'game.sugar.alt.citronnade', icon: '🍋', image: img('citronnade'), cubes: 5, grams: 20 },
  { id: 'thementhe', nameKey: 'game.sugar.item.thementhe', altKey: 'game.sugar.alt.thementhe', icon: '🍵', image: img('thementhe'), cubes: 5, grams: 20 },
  { id: 'cafetunisien', nameKey: 'game.sugar.item.cafetunisien', altKey: 'game.sugar.alt.cafetunisien', icon: '☕', image: img('cafetunisien'), cubes: 3, grams: 12 },
  { id: 'jusorange', nameKey: 'game.sugar.item.jusorange', altKey: 'game.sugar.alt.jusorange', icon: '🧃', image: img('jusorange'), cubes: 6, grams: 22 },
  { id: 'juspomme', nameKey: 'game.sugar.item.juspomme', altKey: 'game.sugar.alt.juspomme', icon: '🧃', image: img('juspomme'), cubes: 6, grams: 24 },
  // Tunisian Food – Bonbons, gâteaux, pâtisseries tunisiennes
  { id: 'bonbon', nameKey: 'game.sugar.item.bonbon', altKey: 'game.sugar.alt.bonbon', icon: '🍬', image: img('bonbon'), cubes: 2, grams: 8 },
  { id: 'cake', nameKey: 'game.sugar.item.cake', altKey: 'game.sugar.alt.cake', icon: '🍰', image: img('cake'), cubes: 7, grams: 28 },
  { id: 'makroudh', nameKey: 'game.sugar.item.makroudh', altKey: 'game.sugar.alt.makroudh', icon: '🥮', image: img('makroudh'), cubes: 7, grams: 28 },
  { id: 'baklava', nameKey: 'game.sugar.item.baklava', altKey: 'game.sugar.alt.baklava', icon: '🥐', image: img('baklava'), cubes: 5, grams: 20 },
  { id: 'zlabia', nameKey: 'game.sugar.item.zlabia', altKey: 'game.sugar.alt.zlabia', icon: '🍩', image: img('zlabia'), cubes: 3, grams: 12 },
  { id: 'bambaloni', nameKey: 'game.sugar.item.bambaloni', altKey: 'game.sugar.alt.bambaloni', icon: '🍩', image: img('bambaloni'), cubes: 4, grams: 16 },
  { id: 'halva', nameKey: 'game.sugar.item.halva', altKey: 'game.sugar.alt.halva', icon: '🥮', image: img('bonbon'), cubes: 5, grams: 20 },
  { id: 'samsa', nameKey: 'game.sugar.item.samsa', altKey: 'game.sugar.alt.samsa', icon: '🥐', image: img('samsa'), cubes: 5, grams: 20 },
  { id: 'kaak', nameKey: 'game.sugar.item.kaak', altKey: 'game.sugar.alt.kaak', icon: '🍪', image: img('kaak'), cubes: 3, grams: 12 },
  { id: 'chocolat', nameKey: 'game.sugar.item.chocolat', altKey: 'game.sugar.alt.chocolat', icon: '🍫', image:'assets/drinks/chocolat.png', cubes: 6, grams: 24 },
  { id: 'glace', nameKey: 'game.sugar.item.glace', altKey: 'game.sugar.alt.glace', icon: '🍦', image: img('glace'), cubes: 5, grams: 20 },
  { id: 'biscuit', nameKey: 'game.sugar.item.biscuit', altKey: 'game.sugar.alt.biscuit', icon: '🍪', image: img('biscuit'), cubes: 3, grams: 12 },
  { id: 'dates', nameKey: 'game.sugar.item.dates', altKey: 'game.sugar.alt.dates', icon: '🌴', image: img('dates'), cubes: 3, grams: 12 },
  { id: 'croissant', nameKey: 'game.sugar.item.croissant', altKey: 'game.sugar.alt.croissant', icon: '🥐', image: 'assets/drinks/croissant.png', cubes: 4, grams: 16 },
  { id: 'donut', nameKey: 'game.sugar.item.donut', altKey: 'game.sugar.alt.donut', icon: '🍩', image: img('donut'), cubes: 5, grams: 20 },
  { id: 'nutella', nameKey: 'game.sugar.item.nutella', altKey: 'game.sugar.alt.nutella', icon: '🥜', image: img('nutella'), cubes: 6, grams: 24 },
  { id: 'confiture', nameKey: 'game.sugar.item.confiture', altKey: 'game.sugar.alt.confiture', icon: '🍓', image: 'assets/drinks/confiture.png', cubes: 4, grams: 16 },
  { id: 'miel', nameKey: 'game.sugar.item.miel', altKey: 'game.sugar.alt.miel', icon: '🍯', image: img('miel'), cubes: 5, grams: 20 },
];
