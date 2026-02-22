import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface HealthData {
  age: number;
  height: number; // in cm
  weight: number; // in kg
}

interface Program {
  type: 'exercise' | 'nutrition';
  title: string;
  items: string[];
}

@Component({
  selector: 'app-ai-health-assistant',
  templateUrl: './ai-health-assistant.component.html',
  styleUrls: ['./ai-health-assistant.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AiHealthAssistantComponent {
  step: 'form' | 'results' = 'form';
  healthData: HealthData = {
    age: 0,
    height: 0,
    weight: 0
  };

  currentBMI: number = 0;
  idealWeight: number = 0;
  weightDifference: number = 0;
  exerciseProgram: Program = { type: 'exercise', title: '', items: [] };
  nutritionProgram: Program = { type: 'nutrition', title: '', items: [] };

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  calculateBMI(weight: number, height: number): number {
    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }

  calculateIdealWeight(age: number, height: number): number {
    // Using BMI range of 18.5-24.9 for ideal weight
    // For children, we use age-adjusted BMI percentiles
    const heightInMeters = height / 100;
    
    // Simplified ideal BMI calculation for children
    // Using midpoint of healthy range (21.7) adjusted for age
    let idealBMI = 21.7;
    
    // Age adjustments for children
    if (age < 10) {
      idealBMI = 16 + (age - 5) * 0.5; // Lower for younger children
    } else if (age < 15) {
      idealBMI = 19 + (age - 10) * 0.4; // Gradual increase
    }
    
    return idealBMI * (heightInMeters * heightInMeters);
  }

  generateExerciseProgram(age: number, weightDifference: number): Program {
    const exercises: string[] = [];
    const intensity = Math.abs(weightDifference) > 10 ? 'high' : 'moderate';
    
    if (age >= 5 && age <= 8) {
      exercises.push(this.translate('ai.exercise.kids1'));
      exercises.push(this.translate('ai.exercise.kids2'));
      exercises.push(this.translate('ai.exercise.kids3'));
      exercises.push(this.translate('ai.exercise.kids4'));
      exercises.push(this.translate('ai.exercise.kids5'));
    } else if (age >= 9 && age <= 12) {
      exercises.push(this.translate('ai.exercise.preteens1'));
      exercises.push(this.translate('ai.exercise.preteens2'));
      exercises.push(this.translate('ai.exercise.preteens3'));
      exercises.push(this.translate('ai.exercise.preteens4'));
      exercises.push(this.translate('ai.exercise.preteens5'));
    }

    if (intensity === 'high') {
      exercises.push(this.translate('ai.exercise.intensity1'));
      exercises.push(this.translate('ai.exercise.intensity2'));
    }

    return {
      type: 'exercise',
      title: this.translate('ai.exercise.title'),
      items: exercises
    };
  }

  generateNutritionProgram(age: number, weightDifference: number): Program {
    const nutritionTips: string[] = [];
    
    nutritionTips.push(this.translate('ai.nutrition.tip1'));
    nutritionTips.push(this.translate('ai.nutrition.tip2'));
    nutritionTips.push(this.translate('ai.nutrition.tip3'));
    nutritionTips.push(this.translate('ai.nutrition.tip4'));
    nutritionTips.push(this.translate('ai.nutrition.tip5'));
    
    if (age >= 5 && age <= 8) {
      nutritionTips.push(this.translate('ai.nutrition.kids1'));
      nutritionTips.push(this.translate('ai.nutrition.kids2'));
    } else if (age >= 9 && age <= 12) {
      nutritionTips.push(this.translate('ai.nutrition.preteens1'));
      nutritionTips.push(this.translate('ai.nutrition.preteens2'));
    }

    if (weightDifference > 5) {
      nutritionTips.push(this.translate('ai.nutrition.weight1'));
      nutritionTips.push(this.translate('ai.nutrition.weight2'));
    }

    return {
      type: 'nutrition',
      title: this.translate('ai.nutrition.title'),
      items: nutritionTips
    };
  }

  onSubmit(): void {
    if (this.healthData.age < 5 || this.healthData.age > 12) {
      alert(this.translate('ai.error.age'));
      return;
    }

    if (this.healthData.height < 80 || this.healthData.height > 180) {
      alert(this.translate('ai.error.height'));
      return;
    }

    if (this.healthData.weight < 15 || this.healthData.weight > 100) {
      alert(this.translate('ai.error.weight'));
      return;
    }

    // Calculate BMI and ideal weight
    this.currentBMI = this.calculateBMI(this.healthData.weight, this.healthData.height);
    this.idealWeight = this.calculateIdealWeight(this.healthData.age, this.healthData.height);
    this.weightDifference = this.healthData.weight - this.idealWeight;

    // Generate programs
    this.exerciseProgram = this.generateExerciseProgram(this.healthData.age, this.weightDifference);
    this.nutritionProgram = this.generateNutritionProgram(this.healthData.age, this.weightDifference);

    // Show results
    this.step = 'results';
  }

  reset(): void {
    this.step = 'form';
    this.healthData = { age: 0, height: 0, weight: 0 };
    this.currentBMI = 0;
    this.idealWeight = 0;
    this.weightDifference = 0;
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return this.translate('ai.bmi.underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      return this.translate('ai.bmi.normal');
    } else if (bmi >= 25 && bmi < 30) {
      return this.translate('ai.bmi.overweight');
    } else {
      return this.translate('ai.bmi.obese');
    }
  }

  getAbsWeightDifference(): string {
    return Math.abs(this.weightDifference).toFixed(1);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
