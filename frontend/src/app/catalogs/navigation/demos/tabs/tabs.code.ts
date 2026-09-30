import { DemoCode } from '../../../../core/catalog.models';

export const TABS_CODE: DemoCode = {
  html: `<mat-tab-group class="demo-tabs" animationDuration="220ms">
  <mat-tab>
    <ng-template matTabLabel>
      <mat-icon>home</mat-icon>
      Inicio
    </ng-template>
    <p class="demo-tab-content">Contenido de la pestaña de inicio.</p>
  </mat-tab>

  <mat-tab label="Características">
    <ul class="demo-list">
      @for (feature of features; track feature) {
        <li>
          <mat-icon>check_circle</mat-icon>
          {{ feature }}
        </li>
      }
    </ul>
  </mat-tab>

  <mat-tab label="Contacto">
    <p class="demo-tab-content">Escribinos a hola@example.com.</p>
  </mat-tab>

  <mat-tab label="Deshabilitada" disabled></mat-tab>
</mat-tab-group>`,
  css: `.tabs-wrap {
  width: 100%;
  max-width: 720px;
  margin-inline: auto;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.demo-tab-content {
  margin: var(--space-4) 0;
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: var(--space-4) 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}`,
  ts: `import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
})
export class TabsDemo {
  protected readonly features = [
    'Componentes standalone',
    'Control flow @if / @for',
    'Formularios reactivos',
    'Estilos centralizados en variables.css',
  ];
}`,
};
