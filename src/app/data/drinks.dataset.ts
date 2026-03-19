/**
 * Sugar Cubes Game - Drinks Dataset
 * Based on real sugar content data (grams per ~250ml serving).
 * 1 sugar cube ≈ 4g sugar (WHO standard).
 * Sources: USDA, beverage nutrition labels, peer-reviewed studies.
 * Images: Unsplash (free to use, unsplash.com/license)
 */
export interface DrinkEntry {
  id: string;
  nameKey: string;
  altKey: string;  // Healthier alternative (specific to this drink)
  icon: string;
  image: string;   // Real photo URL (Unsplash CDN)
  cubes: number;
  grams?: number;  // Optional: actual grams for reference
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&q=80`;

export const DRINKS_DATASET: DrinkEntry[] = [
  // Sodas & Carbonated (high sugar)
  { id: 'cola', nameKey: 'game.sugar.drink.cola', altKey: 'game.sugar.alt.cola', icon: '🥤', image: U('1598556637015-f515d55608fd'), cubes: 7, grams: 28 },
  { id: 'pepsi', nameKey: 'game.sugar.drink.pepsi', altKey: 'game.sugar.alt.pepsi', icon: '🥤', image: U('1629203851122-3726ecdf080e'), cubes: 7, grams: 29 },
  { id: 'mountaindew', nameKey: 'game.sugar.drink.mountaindew', altKey: 'game.sugar.alt.mountaindew', icon: '🥤', image: U('1554866585-cd94860890b7'), cubes: 8, grams: 33 },
  { id: 'sprite', nameKey: 'game.sugar.drink.sprite', altKey: 'game.sugar.alt.sprite', icon: '🍋', image: U('1621263764928-df1444c5e859'), cubes: 7, grams: 27 },
  { id: 'drpepper', nameKey: 'game.sugar.drink.drpepper', altKey: 'game.sugar.alt.drpepper', icon: '🥤', image: U('1554866585-cd94860890b7'), cubes: 7, grams: 29 },
  { id: 'gingerale', nameKey: 'game.sugar.drink.gingerale', altKey: 'game.sugar.alt.gingerale', icon: '🍋', image: U('1621263764928-df1444c5e859'), cubes: 6, grams: 25 },
  { id: 'orangina', nameKey: 'game.sugar.drink.orangina', altKey: 'game.sugar.alt.orangina', icon: '🍊', image: U('1600274921353-4b4a64a98257'), cubes: 6, grams: 26 },
  { id: 'tonic', nameKey: 'game.sugar.drink.tonic', altKey: 'game.sugar.alt.tonic', icon: '🥤', image: U('1548839140-29a749e1cf4d'), cubes: 5, grams: 20 },
  { id: 'lemonade', nameKey: 'game.sugar.drink.lemonade', altKey: 'game.sugar.alt.lemonade', icon: '🍋', image: U('1621263764928-df1444c5e859'), cubes: 6, grams: 25 },

  // Energy & Sports drinks
  { id: 'energy', nameKey: 'game.sugar.drink.energy', altKey: 'game.sugar.alt.energy', icon: '⚡', image: U('1558642452-9d2a7deb7f62'), cubes: 7, grams: 27 },
  { id: 'redbull', nameKey: 'game.sugar.drink.redbull', altKey: 'game.sugar.alt.redbull', icon: '⚡', image: U('1558642452-9d2a7deb7f62'), cubes: 7, grams: 27 },
  { id: 'monster', nameKey: 'game.sugar.drink.monster', altKey: 'game.sugar.alt.monster', icon: '⚡', image: U('1558642452-9d2a7deb7f62'), cubes: 11, grams: 44 },
  { id: 'gatorade', nameKey: 'game.sugar.drink.gatorade', altKey: 'game.sugar.alt.gatorade', icon: '🏃', image: U('1602143407151-7111542de6e8'), cubes: 4, grams: 14 },
  { id: 'vitaminwater', nameKey: 'game.sugar.drink.vitaminwater', altKey: 'game.sugar.alt.vitaminwater', icon: '💧', image: U('1548839140-29a749e1cf4d'), cubes: 3, grams: 13 },

  // Juices (natural sugar, still high)
  { id: 'orangejuice', nameKey: 'game.sugar.drink.orangejuice', altKey: 'game.sugar.alt.orangejuice', icon: '🧃', image: U('1600274921353-4b4a64a98257'), cubes: 6, grams: 22 },
  { id: 'applejuice', nameKey: 'game.sugar.drink.applejuice', altKey: 'game.sugar.alt.applejuice', icon: '🧃', image: U('1600274921353-4b4a64a98257'), cubes: 6, grams: 24 },
  { id: 'cranberry', nameKey: 'game.sugar.drink.cranberry', altKey: 'game.sugar.alt.cranberry', icon: '🧃', image: U('1600274921353-4b4a64a98257'), cubes: 7, grams: 28 },
  { id: 'grapejuice', nameKey: 'game.sugar.drink.grapejuice', altKey: 'game.sugar.alt.grapejuice', icon: '🍇', image: U('1600274921353-4b4a64a98257'), cubes: 8, grams: 32 },
  { id: 'tomatojuice', nameKey: 'game.sugar.drink.tomatojuice', altKey: 'game.sugar.alt.tomatojuice', icon: '🍅', image: U('1600274921353-4b4a64a98257'), cubes: 2, grams: 6 },

  // Coffee & Tea (sweetened)
  { id: 'frappuccino', nameKey: 'game.sugar.drink.frappuccino', altKey: 'game.sugar.alt.frappuccino', icon: '☕', image: U('1509042239860-f590ce592163'), cubes: 12, grams: 50 },
  { id: 'icedcoffee', nameKey: 'game.sugar.drink.icedcoffee', altKey: 'game.sugar.alt.icedcoffee', icon: '☕', image: U('1461023058943-07fcbe16d735'), cubes: 8, grams: 30 },
  { id: 'sweettea', nameKey: 'game.sugar.drink.sweettea', altKey: 'game.sugar.alt.sweettea', icon: '🍵', image: U('1571934811356-5cc061b6821f'), cubes: 7, grams: 28 },
  { id: 'bubbletea', nameKey: 'game.sugar.drink.bubbletea', altKey: 'game.sugar.alt.bubbletea', icon: '🧋', image: U('1594631252845-29fc4cc8cde9'), cubes: 10, grams: 40 },
  { id: 'chai', nameKey: 'game.sugar.drink.chai', altKey: 'game.sugar.alt.chai', icon: '🍵', image: U('1571934811356-5cc061b6821f'), cubes: 6, grams: 24 },

  // Milk & Chocolate
  { id: 'chocolatemilk', nameKey: 'game.sugar.drink.chocolatemilk', altKey: 'game.sugar.alt.chocolatemilk', icon: '🥛', image: U('1542990253-0d0f5be5f0ed'), cubes: 6, grams: 25 },
  { id: 'strawberrymilk', nameKey: 'game.sugar.drink.strawberrymilk', altKey: 'game.sugar.alt.strawberrymilk', icon: '🥛', image: U('1563636619-e9143da7973b'), cubes: 7, grams: 28 },
  { id: 'milkshake', nameKey: 'game.sugar.drink.milkshake', altKey: 'game.sugar.alt.milkshake', icon: '🥤', image: U('1572490122747-3968b75cc699'), cubes: 15, grams: 60 },
  { id: 'hotchocolate', nameKey: 'game.sugar.drink.hotchocolate', altKey: 'game.sugar.alt.hotchocolate', icon: '☕', image: U('1542990253-0d0f5be5f0ed'), cubes: 9, grams: 35 },

  // Smoothies & Blended
  { id: 'smoothie', nameKey: 'game.sugar.drink.smoothie', altKey: 'game.sugar.alt.smoothie', icon: '🥤', image: U('1505252585461-04db1eb84625'), cubes: 10, grams: 40 },
  { id: 'slushie', nameKey: 'game.sugar.drink.slushie', altKey: 'game.sugar.alt.slushie', icon: '🧊', image: U('1559302504-64aae0ca2a3d'), cubes: 12, grams: 48 },
  { id: 'smoothiejuice', nameKey: 'game.sugar.drink.smoothiejuice', altKey: 'game.sugar.alt.smoothiejuice', icon: '🥤', image: U('1505252585461-04db1eb84625'), cubes: 7, grams: 29 },

  // Low / Zero sugar
  { id: 'plainmilk', nameKey: 'game.sugar.drink.plainmilk', altKey: 'game.sugar.alt.plainmilk', icon: '🥛', image: U('1563636619-e9143da7973b'), cubes: 3, grams: 12 },
  { id: 'coconutwater', nameKey: 'game.sugar.drink.coconutwater', altKey: 'game.sugar.alt.coconutwater', icon: '🥥', image: U('1600881332209-736b8b7f6c8a'), cubes: 2, grams: 6 },
  { id: 'kombucha', nameKey: 'game.sugar.drink.kombucha', altKey: 'game.sugar.alt.kombucha', icon: '🫖', image: U('1546173159-315724a31696'), cubes: 1, grams: 4 },
  { id: 'sparklingwater', nameKey: 'game.sugar.drink.sparklingwater', altKey: 'game.sugar.alt.sparklingwater', icon: '💧', image: U('1548839140-29a749e1cf4d'), cubes: 0, grams: 0 },
  { id: 'dietcola', nameKey: 'game.sugar.drink.dietcola', altKey: 'game.sugar.alt.dietcola', icon: '🥤', image: U('1629203851122-3726ecdf080e'), cubes: 0, grams: 0 },
];
