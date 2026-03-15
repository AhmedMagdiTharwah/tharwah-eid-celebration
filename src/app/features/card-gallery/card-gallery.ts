import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import { LanguageService } from '../../core/services/language.service';
import { CelebrationCard } from '../../core/models/card.model';

@Component({
  selector: 'app-card-gallery',
  standalone: true,
  templateUrl: './card-gallery.html',
  styleUrl: './card-gallery.css',
})
export class CardGallery {
  private readonly cardService = inject(CardService);
  private readonly langService = inject(LanguageService);
  private readonly router = inject(Router);

  protected readonly cards = this.cardService.cards;
  protected readonly t = (key: string) => this.langService.t(key);
  protected readonly isRtl = this.langService.isRtl;
  protected readonly currentLang = this.langService.currentLang;

  protected readonly cardName = computed(() => {
    return (card: CelebrationCard) =>
      this.currentLang() === 'ar' ? card.nameAr : card.name;
  });

  protected selectCard(card: CelebrationCard): void {
    this.cardService.selectCard(card);
    this.router.navigate(['/editor']);
  }
}
