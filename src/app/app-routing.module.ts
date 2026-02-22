import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HealthyFoodAdventureComponent } from './components/games/healthy-food-adventure/healthy-food-adventure.component';
import { ExerciseQuestComponent } from './components/games/exercise-quest/exercise-quest.component';
import { PortionControlPuzzleComponent } from './components/games/portion-control-puzzle/portion-control-puzzle.component';
import { WaterHeroChallengeComponent } from './components/games/water-hero-challenge/water-hero-challenge.component';
import { SleepTimeStoriesComponent } from './components/games/sleep-time-stories/sleep-time-stories.component';
import { GardenGrowerComponent } from './components/games/garden-grower/garden-grower.component';
import { ActivePlaygroundComponent } from './components/games/active-playground/active-playground.component';
import { MealPlannerMasterComponent } from './components/games/meal-planner-master/meal-planner-master.component';
import { AiHealthAssistantComponent } from './components/ai-health-assistant/ai-health-assistant.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/healthy-food-adventure', component: HealthyFoodAdventureComponent },
  { path: 'game/exercise-quest', component: ExerciseQuestComponent },
  { path: 'game/portion-control-puzzle', component: PortionControlPuzzleComponent },
  { path: 'game/water-hero-challenge', component: WaterHeroChallengeComponent },
  { path: 'game/sleep-time-stories', component: SleepTimeStoriesComponent },
  { path: 'game/garden-grower', component: GardenGrowerComponent },
  { path: 'game/active-playground', component: ActivePlaygroundComponent },
  { path: 'game/meal-planner-master', component: MealPlannerMasterComponent },
  { path: 'ai-assistant', component: AiHealthAssistantComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

