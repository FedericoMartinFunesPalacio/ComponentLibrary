import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { DemoShell } from '../../../../shared/demo-shell/demo-shell';
import { BREADCRUMBS_CODE } from './breadcrumbs.code';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [DemoShell, MatIconModule],
  templateUrl: './breadcrumbs.html',
  styleUrls: ['./breadcrumbs.css'],
})
export class BreadcrumbsDemo {
  protected readonly code = BREADCRUMBS_CODE;

  protected readonly items = ['Inicio', 'Biblioteca', 'Componentes', 'Botones'];
  protected readonly current = signal(3);

  protected goTo(index: number): void {
    this.current.set(index);
  }

  protected visibleItems(): string[] {
    return this.items.slice(0, this.current() + 1);
  }
}
