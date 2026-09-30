import { Component, computed, ElementRef, inject, input, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate } from 'animejs';

import { DemoCode } from '../../core/catalog.models';
import { getDemoMeta } from '../../core/catalog.data';

export type DemoView = 'preview' | 'html' | 'css' | 'ts';

/**
 * Contenedor estándar de cada demo de la biblioteca.
 * Muestra vista previa, código fuente (HTML/CSS/TS) y botón copiar.
 */
@Component({
  selector: 'app-demo-shell',
  standalone: true,
  imports: [UpperCasePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './demo-shell.html',
  styleUrls: ['./demo-shell.css'],
  host: {
    '[attr.id]': 'item()',
    class: 'demo-block',
  },
})
export class DemoShell {
  readonly item = input.required<string>();
  readonly code = input<DemoCode>({});

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected readonly meta = computed(() => getDemoMeta(this.item()));
  protected readonly view = signal<DemoView>('preview');
  protected readonly copied = signal(false);

  protected readonly languages = computed<DemoView[]>(() => {
    const code = this.code();
    const langs: DemoView[] = [];
    if (code.html) langs.push('html');
    if (code.css) langs.push('css');
    if (code.ts) langs.push('ts');
    return langs;
  });

  protected readonly currentCode = computed(() => {
    const code = this.code();
    switch (this.view()) {
      case 'html':
        return code.html ?? '';
      case 'css':
        return code.css ?? '';
      case 'ts':
        return code.ts ?? '';
      default:
        return '';
    }
  });

  protected setView(view: DemoView): void {
    if (this.view() === view) {
      return;
    }
    this.view.set(view);

    // Se espera al siguiente render para animar el panel ya visible.
    window.setTimeout(() => {
      const selector = view === 'preview' ? '.demo-preview' : '.demo-code';
      const panel = this.host.nativeElement.querySelector<HTMLElement>(selector);
      if (panel) {
        animate(panel, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 340,
          ease: 'outExpo',
        });
      }
    }, 0);
  }

  protected async copy(): Promise<void> {
    const text = this.currentCode();
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      this.copyWithFallback(text);
    }

    this.copied.set(true);
    this.animateCopyFeedback();
    window.setTimeout(() => this.copied.set(false), 2000);
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  private animateCopyFeedback(): void {
    const button = this.host.nativeElement.querySelector<HTMLElement>('.demo-copy-btn');
    if (!button) {
      return;
    }
    animate(button, {
      scale: [1, 1.14, 1],
      duration: 460,
      ease: 'outBack(1.7)',
    });
  }
}
