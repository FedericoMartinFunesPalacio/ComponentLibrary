import { DemoCode } from '../../../../core/catalog.models';

export const BREADCRUMBS_CODE: DemoCode = {
  html: `<nav class="crumbs" aria-label="Ruta de navegación">
  <ol class="crumbs-list">
    @for (item of visibleItems(); track item; let last = $last; let i = $index) {
      <li class="crumbs-item">
        @if (last) {
          <span class="crumbs-current" aria-current="page">
            @if (i === 0) {
              <mat-icon>home</mat-icon>
            }
            {{ item }}
          </span>
        } @else {
          <button type="button" class="crumbs-link" (click)="goTo(i)">
            @if (i === 0) {
              <mat-icon>home</mat-icon>
            }
            {{ item }}
          </button>
          <mat-icon class="crumbs-separator">chevron_right</mat-icon>
        }
      </li>
    }
  </ol>
</nav>`,
  css: `.crumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.crumbs-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.crumbs-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.crumbs-current {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.crumbs-separator {
  font-size: 16px;
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
}`,
  ts: `import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './breadcrumbs.html',
  styleUrls: ['./breadcrumbs.css'],
})
export class BreadcrumbsDemo {
  protected readonly items = ['Inicio', 'Biblioteca', 'Componentes', 'Botones'];
  protected readonly current = signal(3);

  protected goTo(index: number): void {
    this.current.set(index);
  }

  protected visibleItems(): string[] {
    return this.items.slice(0, this.current() + 1);
  }
}`,
};
