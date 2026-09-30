import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, stagger } from 'animejs';

import { Theme, ThemeService } from '../../core/theme.service';

/**
 * Botón de cambio de estilo: cuadrado dividido en 4 cuadraditos
 * con los colores base del tema activo. Al hacer clic abre el menú
 * de temas (definidos en src/variables.css).
 */
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './theme-switcher.html',
  styleUrls: ['./theme-switcher.css'],
})
export class ThemeSwitcher {
  protected readonly themeService = inject(ThemeService);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected readonly open = signal(false);

  protected get themes(): Theme[] {
    return this.themeService.themes;
  }

  protected currentId(): string {
    return this.themeService.current();
  }

  protected currentTheme(): Theme {
    return (
      this.themeService.themes.find((theme) => theme.id === this.currentId()) ?? this.themes[0]
    );
  }

  protected swatch(): Theme['swatch'] {
    return this.currentTheme().swatch;
  }

  protected toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.openMenu();
    }
  }

  protected select(id: string): void {
    this.themeService.select(id);
    this.close();
    this.animateSwatchFeedback();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  private openMenu(): void {
    this.open.set(true);

    window.setTimeout(() => {
      const menu = this.host.nativeElement.querySelector<HTMLElement>('.theme-menu');
      if (!menu) {
        return;
      }
      animate(menu, {
        opacity: [0, 1],
        scale: [0.92, 1],
        translateY: [-8, 0],
        duration: 280,
        ease: 'outBack(1.6)',
      });

      const options = menu.querySelectorAll<HTMLElement>('.theme-option');
      if (options.length) {
        animate(options, {
          opacity: [0, 1],
          translateY: [6, 0],
          delay: stagger(50),
          duration: 300,
          ease: 'outExpo',
        });
      }
    }, 0);
  }

  private close(): void {
    this.open.set(false);
  }

  private animateSwatchFeedback(): void {
    window.setTimeout(() => {
      const cells = this.host.nativeElement.querySelectorAll<HTMLElement>(
        '.theme-trigger .swatch-cell',
      );
      if (cells.length) {
        animate(cells, {
          scale: [1, 0.65, 1],
          delay: stagger(45),
          duration: 460,
          ease: 'outBack(1.7)',
        });
      }
    }, 0);
  }
}
