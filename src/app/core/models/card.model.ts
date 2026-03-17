export interface CelebrationCard {
  id: string;
  name: string;
  nameAr: string;
  imagePath: string;
  thumbnailPath: string;
}

export interface TextOverlay {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  isDragging: boolean;
}

export type Language = 'en' | 'ar';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  'app.title': { en: 'Eid al-Fitr 2026 greeting cards', ar: 'بطاقات تهنئة عيد الفطر 2026' },
  'app.subtitle': { en: 'Add your name and share your Eid greeting', ar: 'أضف اسمك وشارك تهنئتك بالعيد' },
  'gallery.title': { en: 'Choose Your Card', ar: 'اختر بطاقتك' },
  'editor.name': { en: 'Your Name', ar: 'اسمك' },
  'editor.namePlaceholder': { en: 'Enter your name...', ar: 'أدخل اسمك...' },
  'editor.fontSize': { en: 'Font Size', ar: 'حجم الخط' },
  'editor.color': { en: 'Text Color', ar: 'لون النص' },
  'editor.font': { en: 'Font', ar: 'الخط' },
  'editor.download': { en: 'Download Card', ar: 'تحميل البطاقة' },
  'editor.back': { en: 'Back to Gallery', ar: 'العودة للمعرض' },
  'editor.dragHint': { en: 'Click & drag your name on the card to move it anywhere you want', ar: 'اضغط واسحب اسمك على البطاقة لتحريكه في أي مكان تريده' },
  'editor.reset': { en: 'Reset Position', ar: 'إعادة ضبط الموقع' },
};
