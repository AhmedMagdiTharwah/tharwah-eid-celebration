import { Injectable, signal } from '@angular/core';
import { CelebrationCard, TextOverlay } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  readonly cards = signal<CelebrationCard[]>([
    {
      id: 'eid-fitr-01',
      name: 'Eid Al-Fitr - Design 1',
      nameAr: 'عيد الفطر - تصميم ١',
      imagePath: 'cards/eid-fitr-tharwah-01.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-01.png',
    },
    {
      id: 'eid-fitr-02',
      name: 'Eid Al-Fitr - Design 2',
      nameAr: 'عيد الفطر - تصميم ٢',
      imagePath: 'cards/eid-fitr-tharwah-02.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-02.png',
    },
    {
      id: 'eid-fitr-03',
      name: 'Eid Al-Fitr - Design 3',
      nameAr: 'عيد الفطر - تصميم ٣',
      imagePath: 'cards/eid-fitr-tharwah-03.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-03.png',
    },
    {
      id: 'eid-fitr-07',
      name: 'Eid Al-Fitr - Design 4',
      nameAr: 'عيد الفطر - تصميم ٤',
      imagePath: 'cards/eid-fitr-tharwah-07.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-07.png',
    },
    {
      id: 'eid-fitr-05',
      name: 'Eid Al-Fitr - Design 5',
      nameAr: 'عيد الفطر - تصميم ٥',
      imagePath: 'cards/eid-fitr-tharwah-05.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-05.png',
    },
    {
      id: 'eid-fitr-06',
      name: 'Eid Al-Fitr - Design 5',
      nameAr: 'عيد الفطر - تصميم ٥',
      imagePath: 'cards/eid-fitr-tharwah-06.png',
      thumbnailPath: 'cards/eid-fitr-tharwah-06.png',
    },
  ]);

  readonly selectedCard = signal<CelebrationCard | null>(null);

  readonly textOverlay = signal<TextOverlay>({
    text: '',
    x: 50,
    y: 70,
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'Cairo',
    isDragging: false,
  });

  selectCard(card: CelebrationCard): void {
    this.selectedCard.set(card);
    this.textOverlay.update((t) => ({ ...t, text: '', x: 50, y: 70 }));
  }

  clearSelection(): void {
    this.selectedCard.set(null);
  }

  updateText(text: string): void {
    this.textOverlay.update((t) => ({ ...t, text }));
  }

  updatePosition(x: number, y: number): void {
    this.textOverlay.update((t) => ({ ...t, x, y }));
  }

  updateFontSize(fontSize: number): void {
    this.textOverlay.update((t) => ({ ...t, fontSize }));
  }

  updateColor(color: string): void {
    this.textOverlay.update((t) => ({ ...t, color }));
  }

  updateFontFamily(fontFamily: string): void {
    this.textOverlay.update((t) => ({ ...t, fontFamily }));
  }

  resetPosition(): void {
    this.textOverlay.update((t) => ({ ...t, x: 50, y: 70 }));
  }
}
