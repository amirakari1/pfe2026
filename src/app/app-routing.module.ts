import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SugarCubesComponent } from './components/games/sugar-cubes/sugar-cubes.component';
import { TrueFalseComponent } from './components/games/true-false/true-false.component';
import { FoodMemoryComponent } from './components/games/food-memory/food-memory.component';
import { MakeDrinkComponent } from './components/games/make-drink/make-drink.component';
import { SmartShoppingComponent } from './components/games/smart-shopping/smart-shopping.component';
import { FoodPyramidComponent } from './components/games/food-pyramid/food-pyramid.component';
import { FutureChefComponent } from './components/games/future-chef/future-chef.component';
import { HabitBalanceComponent } from './components/games/habit-balance/habit-balance.component';
import { FindMistakeComponent } from './components/games/find-mistake/find-mistake.component';
import { AiHealthAssistantComponent } from './components/ai-health-assistant/ai-health-assistant.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/sugar-cubes', component: SugarCubesComponent },
  { path: 'game/true-false', component: TrueFalseComponent },
  { path: 'game/food-memory', component: FoodMemoryComponent },
  { path: 'game/make-drink', component: MakeDrinkComponent },
  { path: 'game/smart-shopping', component: SmartShoppingComponent },
  { path: 'game/food-pyramid', component: FoodPyramidComponent },
  { path: 'game/future-chef', component: FutureChefComponent },
  { path: 'game/habit-balance', component: HabitBalanceComponent },
  { path: 'game/find-mistake', component: FindMistakeComponent },
  { path: 'ai-assistant', component: AiHealthAssistantComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

