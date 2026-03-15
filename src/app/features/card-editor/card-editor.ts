import {
  Component,
  inject,
  signal,
  computed,
  ElementRef,
  viewChild,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import { LanguageService } from '../../core/services/language.service';

const FONT_OPTIONS = [
  { label: 'Cairo', value: 'Cairo' },
  { label: 'Tajawal', value: 'Tajawal' },
  { label: 'Amiri', value: 'Amiri' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
];

const COLOR_PRESETS = [
  '#ffffff',
  '#000000',
  '#f59e0b',
  '#ef4444',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#d4af37',
  '#c0c0c0',
];

@Component({
  selector: 'app-card-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-editor.html',
  styleUrl: './card-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEditor {
  private readonly cardService = inject(CardService);
  private readonly langService = inject(LanguageService);
  private readonly router = inject(Router);

  readonly cardCanvas = viewChild<ElementRef<HTMLDivElement>>('cardCanvas');

  protected readonly selectedCard = this.cardService.selectedCard;
  protected readonly textOverlay = this.cardService.textOverlay;
  protected readonly t = (key: string) => this.langService.t(key);
  protected readonly isRtl = this.langService.isRtl;
  protected readonly fontOptions = FONT_OPTIONS;
  protected readonly colorPresets = COLOR_PRESETS;
  protected readonly isDownloading = signal(false);

  private dragState = { isDragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 };

  constructor() {
    afterNextRender(() => {
      if (!this.selectedCard()) {
        this.router.navigate(['/']);
      }
    });
  }

  protected updateText(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardService.updateText(input.value);
  }

  protected updateFontSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardService.updateFontSize(Number(input.value));
  }

  protected updateColor(color: string): void {
    this.cardService.updateColor(color);
  }

  protected updateColorFromPicker(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardService.updateColor(input.value);
  }

  protected updateFont(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.cardService.updateFontFamily(select.value);
  }

  protected resetPosition(): void {
    this.cardService.resetPosition();
  }

  protected goBack(): void {
    this.cardService.clearSelection();
    this.router.navigate(['/']);
  }

  // --- Drag logic (percentage-based) ---

  protected onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    const el = event.target as HTMLElement;
    el.setPointerCapture(event.pointerId);

    const canvas = this.cardCanvas()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.dragState = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      startPosX: (this.textOverlay().x / 100) * rect.width,
      startPosY: (this.textOverlay().y / 100) * rect.height,
    };
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragState.isDragging) return;
    event.preventDefault();

    const canvas = this.cardCanvas()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dx = event.clientX - this.dragState.startX;
    const dy = event.clientY - this.dragState.startY;

    const newX = this.dragState.startPosX + dx;
    const newY = this.dragState.startPosY + dy;

    const pctX = Math.max(5, Math.min(95, (newX / rect.width) * 100));
    const pctY = Math.max(5, Math.min(95, (newY / rect.height) * 100));

    this.cardService.updatePosition(pctX, pctY);
  }

  protected onPointerUp(): void {
    this.dragState.isDragging = false;
  }

  // --- Download (native Canvas API to preserve Arabic ligatures) ---

  protected async downloadCard(): Promise<void> {
    const wrapper = this.cardCanvas()?.nativeElement;
    const card = this.selectedCard();
    if (!wrapper || !card) return;

    this.isDownloading.set(true);

    try {
      const img = wrapper.querySelector('img.card-bg') as HTMLImageElement;
      if (!img) return;

      // Wait for image to be fully loaded
      await this.ensureImageLoaded(img);

      // Use the image's natural dimensions for high-res output
      const canvasEl = document.createElement('canvas');
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      canvasEl.width = naturalW;
      canvasEl.height = naturalH;

      const ctx = canvasEl.getContext('2d')!;

      // Draw the card background image
      ctx.drawImage(img, 0, 0, naturalW, naturalH);

      // Draw the text overlay
      const overlay = this.textOverlay();
      if (overlay.text) {
        // Scale font size proportionally to the natural image size
        const displayW = img.clientWidth;
        const scale = naturalW / displayW;
        const scaledFontSize = overlay.fontSize * scale;

        ctx.font = `700 ${scaledFontSize}px "${overlay.fontFamily}", "Cairo", sans-serif`;
        ctx.fillStyle = overlay.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.direction = 'inherit';

        // Add text shadow matching the CSS
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 8 * scale;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2 * scale;

        // Convert percentage position to pixel position
        const textX = (overlay.x / 100) * naturalW;
        const textY = (overlay.y / 100) * naturalH;

        ctx.fillText(overlay.text, textX, textY);
      }

      // Trigger download
      const link = document.createElement('a');
      link.download = `tharwah-eid-card-${Date.now()}.png`;
      link.href = canvasEl.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      this.isDownloading.set(false);
    }
  }

  private ensureImageLoaded(img: HTMLImageElement): Promise<void> {
    if (img.complete && img.naturalWidth > 0) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image failed to load'));
    });
  }
}
