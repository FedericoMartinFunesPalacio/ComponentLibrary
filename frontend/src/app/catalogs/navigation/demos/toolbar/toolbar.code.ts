import { DemoCode } from '../../../../core/catalog.models';

export const TOOLBAR_CODE: DemoCode = {
  html: `<mat-toolbar class="demo-toolbar">
  <span class="demo-toolbar-brand">
    <mat-icon>widgets</mat-icon>
    Mi App
  </span>
  <span class="demo-toolbar-spacer"></span>
  <button mat-button>Inicio</button>
  <button mat-button>Productos</button>
  <button mat-icon-button aria-label="Buscar">
    <mat-icon>search</mat-icon>
  </button>
  <button mat-icon-button aria-label="Cuenta">
    <mat-icon>account_circle</mat-icon>
  </button>
</mat-toolbar>

<mat-toolbar class="demo-toolbar" color="primary">
  <span class="demo-toolbar-brand">Panel de administración</span>
  <span class="demo-toolbar-spacer"></span>
  <button mat-button>Usuarios</button>
  <button mat-stroked-button>Salir</button>
</mat-toolbar>`,
  css: `.demo-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: auto;
  padding-block: var(--space-2);
  border-radius: var(--radius-md);
}

.demo-toolbar-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--font-weight-bold);
}

.demo-toolbar-spacer {
  flex: 1;
}`,
  ts: `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css'],
})
export class ToolbarDemo {}`,
};
