import { AfterViewInit, Component, HostListener, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, stagger } from 'animejs';

import {
  ALL_DEMOS,
  CATALOGS,
  TOTAL_DEMOS,
  searchDemos,
} from '../../core/catalog.data';
import { DemoNavItem } from '../../core/catalog.models';
import { ThemeSwitcher } from '../../shared/theme-switcher/theme-switcher';
import { ButtonsCatalog } from '../../catalogs/buttons/buttons-catalog';
import { FormsCatalog } from '../../catalogs/forms/forms-catalog';
import { TablesCatalog } from '../../catalogs/tables/tables-catalog';
import { FeedbackCatalog } from '../../catalogs/feedback/feedback-catalog';
import { NavigationCatalog } from '../../catalogs/navigation/navigation-catalog';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ThemeSwitcher,
    ButtonsCatalog,
    FormsCatalog,
    TablesCatalog,
    FeedbackCatalog,
    NavigationCatalog,
  ],
  templateUrl: './catalog-page.html',
  styleUrls: ['./catalog-page.css'],
})
export class CatalogPage implements AfterViewInit {
  protected readonly catalogs = CATALOGS;
  protected readonly totalDemos = TOTAL_DEMOS;
  protected readonly query = signal('');
  protected readonly sidebarOpen = signal(false);
  protected readonly activeId = signal<string>(ALL_DEMOS[0]?.id ?? '');

  protected readonly results = computed(() => searchDemos(this.query()));
  protected readonly isSearching = computed(() => this.query().trim().length > 0);

  @HostListener('document:keydown.escape')
  onCloseSidebar(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Al pasar a escritorio se limpia el estado del drawer móvil.
    if (window.innerWidth >= 1024 && this.sidebarOpen()) {
      this.sidebarOpen.set(false);
      document.body.style.overflow = '';
      const sidebar = document.querySelector<HTMLElement>('.catalog-sidebar');
      const backdrop = document.querySelector<HTMLElement>('.catalog-backdrop');
      if (sidebar) {
        sidebar.style.transform = '';
      }
      if (backdrop) {
        backdrop.style.opacity = '';
      }
    }
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => this.setupAnimations(), 0);
  }

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected clearSearch(): void {
    this.query.set('');
  }

  protected goTo(id: string): void {
    this.activeId.set(id);
    this.closeSidebar();

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  protected toggleSidebar(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  private openSidebar(): void {
    this.sidebarOpen.set(true);
    document.body.style.overflow = 'hidden';

    const sidebar = document.querySelector<HTMLElement>('.catalog-sidebar');
    const backdrop = document.querySelector<HTMLElement>('.catalog-backdrop');
    if (sidebar) {
      animate(sidebar, {
        translateX: ['-100%', '0%'],
        duration: 420,
        ease: 'outExpo',
      });
    }
    if (backdrop) {
      animate(backdrop, { opacity: [0, 1], duration: 300, ease: 'linear' });
    }
  }

  protected closeSidebar(): void {
    if (!this.sidebarOpen()) {
      return;
    }
    this.sidebarOpen.set(false);
    document.body.style.overflow = '';

    const sidebar = document.querySelector<HTMLElement>('.catalog-sidebar');
    const backdrop = document.querySelector<HTMLElement>('.catalog-backdrop');
    if (sidebar) {
      animate(sidebar, {
        translateX: ['0%', '-100%'],
        duration: 320,
        ease: 'inOutCubic',
      });
    }
    if (backdrop) {
      animate(backdrop, { opacity: [1, 0], duration: 250, ease: 'linear' });
    }
  }

  private setupAnimations(): void {
    this.animateHero();
    this.animateReveal();
    this.setupScrollSpy();
  }

  private animateHero(): void {
    const items = document.querySelectorAll<HTMLElement>('[data-hero]');
    if (!items.length) {
      return;
    }
    animate(items, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(110),
      duration: 760,
      ease: 'outExpo',
    });
  }

  private animateReveal(): void {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('.demo-block, .section-header')
    );
    if (!targets.length) {
      return;
    }

    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            observer.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            animate(el, {
              opacity: [0, 1],
              translateY: [28, 0],
              duration: 700,
              ease: 'outExpo',
              onComplete: () => {
                el.style.opacity = '';
                el.style.transform = '';
              },
            });
          });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  private setupScrollSpy(): void {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>('.demo-block'));
    if (!blocks.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeId.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    blocks.forEach((block) => observer.observe(block));
  }

  protected trackDemo(_index: number, demo: DemoNavItem): string {
    return demo.id;
  }
}
