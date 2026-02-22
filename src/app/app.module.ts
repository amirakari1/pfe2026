import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { HealthyFoodAdventureComponent } from './components/games/healthy-food-adventure/healthy-food-adventure.component';
import { ExerciseQuestComponent } from './components/games/exercise-quest/exercise-quest.component';
import { PortionControlPuzzleComponent } from './components/games/portion-control-puzzle/portion-control-puzzle.component';
import { WaterHeroChallengeComponent } from './components/games/water-hero-challenge/water-hero-challenge.component';
import { SleepTimeStoriesComponent } from './components/games/sleep-time-stories/sleep-time-stories.component';
import { GardenGrowerComponent } from './components/games/garden-grower/garden-grower.component';
import { ActivePlaygroundComponent } from './components/games/active-playground/active-playground.component';
import { MealPlannerMasterComponent } from './components/games/meal-planner-master/meal-planner-master.component';
import { AiHealthAssistantComponent } from './components/ai-health-assistant/ai-health-assistant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LanguageSwitcherComponent,
    HealthyFoodAdventureComponent,
    ExerciseQuestComponent,
    PortionControlPuzzleComponent,
    WaterHeroChallengeComponent,
    SleepTimeStoriesComponent,
    GardenGrowerComponent,
    ActivePlaygroundComponent,
    MealPlannerMasterComponent,
    AiHealthAssistantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

