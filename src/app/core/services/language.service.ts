import { Injectable, signal, computed } from '@angular/core';
import { Language, TRANSLATIONS } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLang = signal<Language>('ar');
  readonly isRtl = computed(() => this.currentLang() === 'ar');
  readonly dir = computed(() => this.isRtl() ? 'rtl' : 'ltr');

  toggleLanguage(): void {
    this.currentLang.set(this.currentLang() === 'ar' ? 'en' : 'ar');
  }

  t(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.currentLang()] || key;
  }
}
