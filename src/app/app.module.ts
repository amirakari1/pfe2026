import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
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
import { GameFeedbackOverlayComponent } from './components/game-feedback-overlay/game-feedback-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LanguageSwitcherComponent,
    ThemeToggleComponent,
    SugarCubesComponent,
    TrueFalseComponent,
    FoodMemoryComponent,
    MakeDrinkComponent,
    SmartShoppingComponent,
    FoodPyramidComponent,
    FutureChefComponent,
    HabitBalanceComponent,
    FindMistakeComponent,
    AiHealthAssistantComponent,
    GameFeedbackOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

