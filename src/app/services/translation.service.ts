import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('ar');
  currentLanguage$ = this.currentLanguage.asObservable();

  private translations: { [lang: string]: Translation } = {
    en: {
      // Header
      'app.title': 'Obesity Prevention Platform',
      'app.subtitle': 'Empowering children with knowledge and fun activities for a healthier future',
      
      // Navigation
      'nav.home': 'Home',
      
      // Home Page
      'home.about.title': 'About Our Project',
      'home.about.welcome': 'Welcome to our Obesity Prevention Educational Platform! This project is designed to address the growing concern of childhood obesity through interactive learning and engaging activities.',
      'home.about.mission': 'Our mission is to educate children about healthy lifestyle choices, proper nutrition, and the importance of physical activity in a fun and interactive way. We believe that early education and positive reinforcement are key to preventing obesity and promoting lifelong healthy habits.',
      'home.about.objectives': 'Key Objectives:',
      'home.about.objective1': 'Educate children about healthy eating habits',
      'home.about.objective2': 'Promote regular physical activity',
      'home.about.objective3': 'Teach portion control and balanced nutrition',
      'home.about.objective4': 'Encourage adequate hydration and sleep',
      'home.about.objective5': 'Make learning about health fun and engaging',
      
      'home.stats.games': 'Educational Games',
      'home.stats.age': 'Age Range',
      'home.stats.fun': 'Fun & Educational',
      
      'home.games.title': 'Educational Games for Children',
      'home.games.description': 'Explore our collection of interactive games designed to teach children about healthy living and obesity prevention in an engaging way.',
      'home.games.category.nutrition': 'Nutrition',
      'home.games.category.puzzle': 'Puzzle',
      'home.games.years': 'years',
      
      'home.contact.title': 'Get in Touch',
      'home.contact.description': 'Have questions or feedback? We\'d love to hear from you!',
      'home.contact.email': 'Email',
      'home.contact.phone': 'Phone',
      'home.contact.address': 'Address',
      'home.contact.name': 'Name',
      'home.contact.namePlaceholder': 'Your name',
      'home.contact.emailPlaceholder': 'your.email@example.com',
      'home.contact.message': 'Message',
      'home.contact.messagePlaceholder': 'Your message...',
      'home.contact.send': 'Send Message',
      'home.contact.success': 'Thank you for your message! We will get back to you soon.',
      
      'home.footer.copyright': '© 2026 Obesity Prevention Platform. All rights reserved.',
      'home.footer.note': 'Promoting healthy lifestyles for a better future',
      'home.ai.banner': 'Get Your Personalized Health Program with AI Assistant',
      
      // Games
      'game.start': 'Start Game',
      'game.play': 'Play Now',
      'game.score': 'Score',
      'game.level': 'Level',
      'game.moves': 'Moves',
      'game.lives': 'Lives',
      'game.restart': 'Play Again',
      'game.back': 'Go Home',
      'game.over': 'Game Over',
      'game.finalScore': 'Final Score',
      'game.levelReached': 'Level Reached',
      
      // Game specific
      'game.healthyFood.title': 'Healthy Food Adventure',
      'game.healthyFood.description': 'Help the character choose healthy foods and avoid junk food while navigating through different levels.',
      'game.healthyFood.instruction': 'Choose the healthy food!',
      'game.healthyFood.great': 'Great choice!',
      'game.healthyFood.oops': 'Oops! That\'s not healthy',
      
      'game.exercise.title': 'Anime Exercise Puzzle',
      'game.exercise.description': 'Match exercise blocks in this anime-style puzzle game! Swap tiles to create matches and help Akira stay active.',
      'game.exercise.instruction': 'Match 3+ exercise blocks to score points!',
      'game.exercise.swap': 'Swap adjacent blocks to create matches!',
      'game.exercise.welcome': 'Welcome to Anime Exercise Puzzle! 💪',
      'game.exercise.workout': 'Great workout!',
      'game.exercise.complete': 'Workout complete!',
      
      'game.memory.title': 'Anime Memory Puzzle',
      'game.memory.description': 'Match food cards with their portion sizes in this anime memory puzzle game!',
      'game.memory.instruction': 'Flip cards to find matching pairs!',
      'game.memory.welcome': 'Welcome to Anime Memory Puzzle! 🎮',
      'game.memory.pairs': 'Match food cards with their portion sizes!',
      'game.memory.perfect': 'Perfect! You matched all pairs!',
      
      'game.sliding.title': 'Anime Sliding Puzzle',
      'game.sliding.description': 'Slide the pieces to solve the puzzle! Help Mizu arrange the numbers correctly.',
      'game.sliding.instruction': 'Click pieces next to the empty space to slide them!',
      'game.sliding.welcome': 'Welcome to Anime Sliding Puzzle! 🎮',
      'game.sliding.arrange': 'Arrange numbers 1-15 in order to win!',
      'game.sliding.win': 'Congratulations! You solved the puzzle in',
      'game.sliding.moves': 'moves!',
      
      'game.sleep.title': 'Anime Sleep Puzzle',
      'game.sleep.description': 'Match sleep-themed tiles in this anime puzzle game! Learn about healthy sleep habits with Yume.',
      'game.sleep.instruction': 'Match 3+ sleep tiles to score points!',
      'game.sleep.welcome': 'Welcome to Anime Sleep Puzzle! 🎮',
      'game.sleep.learn': 'Learn about healthy sleep habits!',
      'game.sleep.dreams': 'Sweet dreams!',
      
      'game.garden.title': 'Anime Garden Puzzle',
      'game.garden.description': 'Match vegetables in this anime puzzle game! Help Haru grow a healthy garden.',
      'game.garden.instruction': 'Match 3+ vegetables to score points!',
      'game.garden.welcome': 'Welcome to Anime Garden Puzzle! 🎮',
      'game.garden.learn': 'Learn about healthy vegetables!',
      'game.garden.harvest': 'Great harvest!',
      
      'game.playground.title': 'Anime Playground Puzzle',
      'game.playground.description': 'Match activity tiles in this anime puzzle game! Stay active with Kaito.',
      'game.playground.instruction': 'Match 3+ activity tiles to score points!',
      'game.playground.welcome': 'Welcome to Anime Playground Puzzle! 🎮',
      'game.playground.active': 'Stay active and healthy!',
      'game.playground.workout': 'Great workout!',
      
      'game.meal.title': 'Anime Meal Puzzle',
      'game.meal.description': 'Match food groups in this anime puzzle game! Learn about balanced nutrition with Riku.',
      'game.meal.instruction': 'Match 3+ food groups to score points!',
      'game.meal.welcome': 'Welcome to Anime Meal Puzzle! 🎮',
      'game.meal.learn': 'Learn about balanced nutrition!',
      'game.meal.perfect': 'Perfect meal planning!',
      
      // AI Health Assistant
      'ai.title': 'AI Health Assistant',
      'ai.welcome': 'Hello! I\'m your AI Health Assistant 🤖',
      'ai.description': 'I can help you achieve your ideal weight! Just tell me your age, height, and weight, and I\'ll create a personalized exercise and nutrition program for you.',
      'ai.form.age': 'Age',
      'ai.form.agePlaceholder': 'Enter your age (5-12 years)',
      'ai.form.ageHint': 'Age should be between 5 and 12 years',
      'ai.form.height': 'Height (cm)',
      'ai.form.heightPlaceholder': 'Enter your height in centimeters',
      'ai.form.heightHint': 'Height should be between 80 and 180 cm',
      'ai.form.weight': 'Weight (kg)',
      'ai.form.weightPlaceholder': 'Enter your weight in kilograms',
      'ai.form.weightHint': 'Weight should be between 15 and 100 kg',
      'ai.form.submit': 'Get My Program',
      'ai.error.age': 'Please enter a valid age between 5 and 12 years.',
      'ai.error.height': 'Please enter a valid height between 80 and 180 cm.',
      'ai.error.weight': 'Please enter a valid weight between 15 and 100 kg.',
      'ai.results.title': 'Your Personalized Health Program',
      'ai.results.currentBMI': 'Current BMI',
      'ai.results.idealWeight': 'Ideal Weight',
      'ai.results.toLose': 'Weight to lose',
      'ai.results.toGain': 'Weight to gain',
      'ai.results.reset': 'Start Over',
      'ai.results.home': 'Go Home',
      'ai.bmi.underweight': 'Underweight',
      'ai.bmi.normal': 'Normal Weight',
      'ai.bmi.overweight': 'Overweight',
      'ai.bmi.obese': 'Obese',
      'ai.exercise.title': 'Exercise Program',
      'ai.exercise.kids1': '30 minutes of outdoor play daily',
      'ai.exercise.kids2': 'Jumping jacks: 3 sets of 10',
      'ai.exercise.kids3': 'Running in place: 2 minutes',
      'ai.exercise.kids4': 'Dancing to favorite music: 15 minutes',
      'ai.exercise.kids5': 'Playing tag or hide and seek',
      'ai.exercise.preteens1': '45 minutes of physical activity daily',
      'ai.exercise.preteens2': 'Jumping jacks: 3 sets of 15',
      'ai.exercise.preteens3': 'Running or jogging: 10 minutes',
      'ai.exercise.preteens4': 'Bike riding or swimming: 20 minutes',
      'ai.exercise.preteens5': 'Team sports or active games',
      'ai.exercise.intensity1': 'Increase activity gradually',
      'ai.exercise.intensity2': 'Take breaks and stay hydrated',
      'ai.nutrition.title': 'Nutrition Program',
      'ai.nutrition.tip1': 'Eat 5 servings of fruits and vegetables daily',
      'ai.nutrition.tip2': 'Choose whole grains over refined grains',
      'ai.nutrition.tip3': 'Drink plenty of water (6-8 glasses daily)',
      'ai.nutrition.tip4': 'Limit sugary drinks and snacks',
      'ai.nutrition.tip5': 'Eat regular meals and don\'t skip breakfast',
      'ai.nutrition.kids1': 'Have healthy snacks between meals',
      'ai.nutrition.kids2': 'Make meals colorful and fun',
      'ai.nutrition.preteens1': 'Plan balanced meals with protein, carbs, and veggies',
      'ai.nutrition.preteens2': 'Learn to read food labels',
      'ai.nutrition.weight1': 'Reduce portion sizes gradually',
      'ai.nutrition.weight2': 'Focus on nutrient-dense foods',
    },
    ar: {
      // Header
      'app.title': 'منصة الوقاية من السمنة',
      'app.subtitle': 'تمكين الأطفال بالمعرفة والأنشطة الممتعة لمستقبل أكثر صحة',
      
      // Navigation
      'nav.home': 'الرئيسية',
      
      // Home Page
      'home.about.title': 'حول مشروعنا',
      'home.about.welcome': 'مرحباً بكم في منصة التعليم للوقاية من السمنة! تم تصميم هذا المشروع لمعالجة القلق المتزايد بشأن سمنة الأطفال من خلال التعلم التفاعلي والأنشطة الجذابة.',
      'home.about.mission': 'مهمتنا هي تثقيف الأطفال حول خيارات نمط الحياة الصحية والتغذية السليمة وأهمية النشاط البدني بطريقة ممتعة وتفاعلية. نؤمن أن التعليم المبكر والتعزيز الإيجابي هما المفتاح لمنع السمنة وتعزيز العادات الصحية مدى الحياة.',
      'home.about.objectives': 'الأهداف الرئيسية:',
      'home.about.objective1': 'تثقيف الأطفال حول عادات الأكل الصحية',
      'home.about.objective2': 'تعزيز النشاط البدني المنتظم',
      'home.about.objective3': 'تعليم التحكم في الحصص والتغذية المتوازنة',
      'home.about.objective4': 'تشجيع الترطيب الكافي والنوم',
      'home.about.objective5': 'جعل تعلم الصحة ممتعاً وجذاباً',
      
      'home.stats.games': 'ألعاب تعليمية',
      'home.stats.age': 'الفئة العمرية',
      'home.stats.fun': 'ممتعة وتعليمية',
      
      'home.games.title': 'ألعاب تعليمية للأطفال',
      'home.games.description': 'استكشف مجموعتنا من الألعاب التفاعلية المصممة لتعليم الأطفال حول الحياة الصحية والوقاية من السمنة بطريقة جذابة.',
      'home.games.category.nutrition': 'التغذية',
      'home.games.category.puzzle': 'لغز',
      'home.games.years': 'سنوات',
      
      'home.contact.title': 'تواصل معنا',
      'home.contact.description': 'هل لديك أسئلة أو ملاحظات؟ نحب أن نسمع منك!',
      'home.contact.email': 'البريد الإلكتروني',
      'home.contact.phone': 'الهاتف',
      'home.contact.address': 'العنوان',
      'home.contact.name': 'الاسم',
      'home.contact.namePlaceholder': 'اسمك',
      'home.contact.emailPlaceholder': 'بريدك.الإلكتروني@example.com',
      'home.contact.message': 'الرسالة',
      'home.contact.messagePlaceholder': 'رسالتك...',
      'home.contact.send': 'إرسال الرسالة',
      'home.contact.success': 'شكراً لرسالتك! سنعود إليك قريباً.',
      
      'home.footer.copyright': '© 2026 منصة الوقاية من السمنة. جميع الحقوق محفوظة.',
      'home.footer.note': 'تعزيز أنماط الحياة الصحية لمستقبل أفضل',
      'home.ai.banner': 'احصل على برنامجك الصحي المخصص مع المساعد الذكي',
      
      // Games
      'game.start': 'بدء اللعبة',
      'game.play': 'العب الآن',
      'game.score': 'النقاط',
      'game.level': 'المستوى',
      'game.moves': 'الحركات',
      'game.lives': 'الأرواح',
      'game.restart': 'العب مرة أخرى',
      'game.back': 'العودة للرئيسية',
      'game.over': 'انتهت اللعبة',
      'game.finalScore': 'النقاط النهائية',
      'game.levelReached': 'المستوى الذي وصلت إليه',
      
      // Game specific
      'game.healthyFood.title': 'مغامرة الطعام الصحي',
      'game.healthyFood.description': 'ساعد الشخصية على اختيار الأطعمة الصحية وتجنب الوجبات السريعة أثناء التنقل عبر المستويات المختلفة.',
      'game.healthyFood.instruction': 'اختر الطعام الصحي!',
      'game.healthyFood.great': 'اختيار رائع!',
      'game.healthyFood.oops': 'عذراً! هذا ليس صحياً',
      
      'game.exercise.title': 'لغز التمارين الأنمي',
      'game.exercise.description': 'طابق كتل التمارين في لعبة اللغز على الطريقة الأنمي! قم بتبديل البلاطات لإنشاء التطابقات وساعد أكيرا على البقاء نشطاً.',
      'game.exercise.instruction': 'طابق 3+ كتل تمارين لتحقيق النقاط!',
      'game.exercise.swap': 'قم بتبديل الكتل المجاورة لإنشاء التطابقات!',
      'game.exercise.welcome': 'مرحباً بك في لغز التمارين الأنمي! 💪',
      'game.exercise.workout': 'تمرين رائع!',
      'game.exercise.complete': 'اكتمل التمرين!',
      
      'game.memory.title': 'لغز الذاكرة الأنمي',
      'game.memory.description': 'طابق بطاقات الطعام مع أحجام الحصص في لعبة لغز الذاكرة الأنمي!',
      'game.memory.instruction': 'اقلب البطاقات للعثور على الأزواج المتطابقة!',
      'game.memory.welcome': 'مرحباً بك في لغز الذاكرة الأنمي! 🎮',
      'game.memory.pairs': 'طابق بطاقات الطعام مع أحجام الحصص!',
      'game.memory.perfect': 'ممتاز! لقد طابقت جميع الأزواج!',
      
      'game.sliding.title': 'لغز الانزلاق الأنمي',
      'game.sliding.description': 'انزلق القطع لحل اللغز! ساعد ميزو على ترتيب الأرقام بشكل صحيح.',
      'game.sliding.instruction': 'انقر على القطع بجوار المساحة الفارغة لانزلاقها!',
      'game.sliding.welcome': 'مرحباً بك في لغز الانزلاق الأنمي! 🎮',
      'game.sliding.arrange': 'رتب الأرقام من 1 إلى 15 بالترتيب للفوز!',
      'game.sliding.win': 'تهانينا! لقد حللت اللغز في',
      'game.sliding.moves': 'حركة!',
      
      'game.sleep.title': 'لغز النوم الأنمي',
      'game.sleep.description': 'طابق البلاطات المتعلقة بالنوم في لعبة اللغز الأنمي! تعلم عن عادات النوم الصحية مع يومي.',
      'game.sleep.instruction': 'طابق 3+ بلاطات نوم لتحقيق النقاط!',
      'game.sleep.welcome': 'مرحباً بك في لغز النوم الأنمي! 🎮',
      'game.sleep.learn': 'تعلم عن عادات النوم الصحية!',
      'game.sleep.dreams': 'أحلام سعيدة!',
      
      'game.garden.title': 'لغز الحديقة الأنمي',
      'game.garden.description': 'طابق الخضروات في لعبة اللغز الأنمي! ساعد هارو على زراعة حديقة صحية.',
      'game.garden.instruction': 'طابق 3+ خضروات لتحقيق النقاط!',
      'game.garden.welcome': 'مرحباً بك في لغز الحديقة الأنمي! 🎮',
      'game.garden.learn': 'تعلم عن الخضروات الصحية!',
      'game.garden.harvest': 'حصاد رائع!',
      
      'game.playground.title': 'لغز الملعب الأنمي',
      'game.playground.description': 'طابق بلاطات الأنشطة في لعبة اللغز الأنمي! ابق نشطاً مع كايتو.',
      'game.playground.instruction': 'طابق 3+ بلاطات أنشطة لتحقيق النقاط!',
      'game.playground.welcome': 'مرحباً بك في لغز الملعب الأنمي! 🎮',
      'game.playground.active': 'ابق نشطاً وصحياً!',
      'game.playground.workout': 'تمرين رائع!',
      
      'game.meal.title': 'لغز الوجبات الأنمي',
      'game.meal.description': 'طابق مجموعات الطعام في لعبة اللغز الأنمي! تعلم عن التغذية المتوازنة مع ريكو.',
      'game.meal.instruction': 'طابق 3+ مجموعات طعام لتحقيق النقاط!',
      'game.meal.welcome': 'مرحباً بك في لغز الوجبات الأنمي! 🎮',
      'game.meal.learn': 'تعلم عن التغذية المتوازنة!',
      'game.meal.perfect': 'تخطيط وجبات مثالي!',
      
      // AI Health Assistant
      'ai.title': 'مساعد الصحة الذكي',
      'ai.welcome': 'مرحباً! أنا مساعدك الصحي الذكي 🤖',
      'ai.description': 'يمكنني مساعدتك في الوصول إلى وزنك المثالي! فقط أخبرني بعمرك وطولك ووزنك، وسأقوم بإنشاء برنامج تمرين وتغذية مخصص لك.',
      'ai.form.age': 'العمر',
      'ai.form.agePlaceholder': 'أدخل عمرك (5-12 سنة)',
      'ai.form.ageHint': 'يجب أن يكون العمر بين 5 و 12 سنة',
      'ai.form.height': 'الطول (سم)',
      'ai.form.heightPlaceholder': 'أدخل طولك بالسنتيمترات',
      'ai.form.heightHint': 'يجب أن يكون الطول بين 80 و 180 سم',
      'ai.form.weight': 'الوزن (كجم)',
      'ai.form.weightPlaceholder': 'أدخل وزنك بالكيلوجرامات',
      'ai.form.weightHint': 'يجب أن يكون الوزن بين 15 و 100 كجم',
      'ai.form.submit': 'احصل على برنامجي',
      'ai.error.age': 'الرجاء إدخال عمر صحيح بين 5 و 12 سنة.',
      'ai.error.height': 'الرجاء إدخال طول صحيح بين 80 و 180 سم.',
      'ai.error.weight': 'الرجاء إدخال وزن صحيح بين 15 و 100 كجم.',
      'ai.results.title': 'برنامجك الصحي المخصص',
      'ai.results.currentBMI': 'مؤشر كتلة الجسم الحالي',
      'ai.results.idealWeight': 'الوزن المثالي',
      'ai.results.toLose': 'الوزن المطلوب خسارته',
      'ai.results.toGain': 'الوزن المطلوب اكتسابه',
      'ai.results.reset': 'ابدأ من جديد',
      'ai.results.home': 'العودة للرئيسية',
      'ai.bmi.underweight': 'نقص الوزن',
      'ai.bmi.normal': 'وزن طبيعي',
      'ai.bmi.overweight': 'زيادة الوزن',
      'ai.bmi.obese': 'سمنة',
      'ai.exercise.title': 'برنامج التمارين',
      'ai.exercise.kids1': '30 دقيقة من اللعب في الهواء الطلق يومياً',
      'ai.exercise.kids2': 'قفزات جانبية: 3 مجموعات من 10',
      'ai.exercise.kids3': 'الجري في المكان: دقيقتان',
      'ai.exercise.kids4': 'الرقص على الموسيقى المفضلة: 15 دقيقة',
      'ai.exercise.kids5': 'لعب الغميضة أو المطاردة',
      'ai.exercise.preteens1': '45 دقيقة من النشاط البدني يومياً',
      'ai.exercise.preteens2': 'قفزات جانبية: 3 مجموعات من 15',
      'ai.exercise.preteens3': 'الجري أو الهرولة: 10 دقائق',
      'ai.exercise.preteens4': 'ركوب الدراجة أو السباحة: 20 دقيقة',
      'ai.exercise.preteens5': 'الألعاب الجماعية أو الألعاب النشطة',
      'ai.exercise.intensity1': 'زيادة النشاط تدريجياً',
      'ai.exercise.intensity2': 'خذ فترات راحة وابق رطباً',
      'ai.nutrition.title': 'برنامج التغذية',
      'ai.nutrition.tip1': 'تناول 5 حصص من الفواكه والخضروات يومياً',
      'ai.nutrition.tip2': 'اختر الحبوب الكاملة بدلاً من المكررة',
      'ai.nutrition.tip3': 'اشرب الكثير من الماء (6-8 أكواب يومياً)',
      'ai.nutrition.tip4': 'قلل من المشروبات والوجبات الخفيفة السكرية',
      'ai.nutrition.tip5': 'تناول وجبات منتظمة ولا تفوت الإفطار',
      'ai.nutrition.kids1': 'تناول وجبات خفيفة صحية بين الوجبات',
      'ai.nutrition.kids2': 'اجعل الوجبات ملونة وممتعة',
      'ai.nutrition.preteens1': 'خطط لوجبات متوازنة مع البروتين والكربوهيدرات والخضروات',
      'ai.nutrition.preteens2': 'تعلم قراءة ملصقات الطعام',
      'ai.nutrition.weight1': 'قلل أحجام الحصص تدريجياً',
      'ai.nutrition.weight2': 'ركز على الأطعمة الغنية بالعناصر الغذائية',
    }
  };

  constructor() {
    // Set initial language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('language') || 'ar';
    this.setLanguage(savedLang);
  }

  getTranslation(key: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang]?.[key] || key;
  }

  setLanguage(lang: string): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }
}

