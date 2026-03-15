import { Injectable, signal } from '@angular/core';
import { CelebrationCard, TextOverlay } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  readonly cards = signal<CelebrationCard[]>([
    {
      id: 'card-1',
      name: 'Eid Mubarak - Sky Blue',
      nameAr: 'عيد مبارك - أزرق سماوي',
      imagePath: 'cards/card-1.png',
      thumbnailPath: 'cards/card-1.png',
    },
    {
      id: 'card-2',
      name: 'Eid Mubarak - Mosque',
      nameAr: 'عيد مبارك - المسجد',
      imagePath: 'cards/card-2.png',
      thumbnailPath: 'cards/card-2.png',
    },
    {
      id: 'card-3',
      name: 'Eid Mubarak - Night',
      nameAr: 'عيد مبارك - ليلي',
      imagePath: 'cards/card-3.png',
      thumbnailPath: 'cards/card-3.png',
    },
    {
      id: 'card-4',
      name: 'Eid Mubarak - Golden Dome',
      nameAr: 'عيد مبارك - القبة الذهبية',
      imagePath: 'cards/card-4.png',
      thumbnailPath: 'cards/card-4.png',
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
